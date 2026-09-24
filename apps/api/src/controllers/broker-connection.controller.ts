import type { Response } from "express";
import { prisma } from "@pms-oms/db";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
	encryptBrokerData,
	decryptBrokerData,
} from "../security/broker-credential-crypto";
import {
	exchangeZerodhaSession,
	getZerodhaLoginUrl as createZerodhaLoginUrl,
} from "../services/zerodha-connection.services";

type BrokerAccountRequest = AuthenticatedRequest & {
	params: { brokerAccountId: string };
};

type ZerodhaCredentialsBody = {
	apiKey?: unknown;
	apiSecret?: unknown;
};

type ZerodhaSessionBody = {
	requestToken?: unknown;
};

type ZerodhaCredentials = {
	apiKey: string;
	apiSecret: string;
};

async function findBrokerAccount(
	req: BrokerAccountRequest,
) {
	return prisma.brokerAccount.findFirst({
		where: {
			id: req.params.brokerAccountId,
			client: { firmId: req.user!.firmId },
		},
		include: { connection: true },
	});
}

function invalidInput(res: Response, error: string) {
	return res.status(400).json({ error });
}

export async function configureZerodha(
	req: BrokerAccountRequest & { body: ZerodhaCredentialsBody },
	res: Response,
) {
	const { apiKey, apiSecret } = req.body ?? {};

	if (
		typeof apiKey !== "string" || !apiKey.trim() ||
		typeof apiSecret !== "string" || !apiSecret.trim()
	) {
		return invalidInput(res, "apiKey and apiSecret are required");
	}

	try {
		const account = await findBrokerAccount(req);
		if (!account) return res.status(404).json({ error: "Broker account not found" });
		if (account.broker.toUpperCase() !== "ZERODHA") {
			return res.status(400).json({ error: "Broker account is not a Zerodha account" });
		}

		const connection = await prisma.brokerConnection.upsert({
			where: { brokerAccountId: account.id },
			create: {
				brokerAccountId: account.id,
				credentialsEncrypted: encryptBrokerData({ apiKey, apiSecret }),
				status: "DISCONNECTED",
			},
			update: {
				credentialsEncrypted: encryptBrokerData({ apiKey, apiSecret }),
				sessionEncrypted: null,
				externalUserId: null,
				sessionExpiresAt: null,
				status: "DISCONNECTED",
				lastConnectedAt: null,
			},
		});

		return res.status(200).json({
			data: {
				brokerAccountId: connection.brokerAccountId,
				status: connection.status,
			},
		});
	} catch (error) {
		console.error("Failed to configure Zerodha:", error);
		return res.status(500).json({ error: "Failed to configure Zerodha" });
	}
}

export async function getZerodhaLoginUrl(
	req: BrokerAccountRequest,
	res: Response,
) {
	try {
		const account = await findBrokerAccount(req);
		if (!account) return res.status(404).json({ error: "Broker account not found" });
		if (!account.connection?.credentialsEncrypted) {
			return res.status(409).json({ error: "Zerodha is not configured" });
		}

		const credentials = decryptBrokerData<ZerodhaCredentials>(
			account.connection.credentialsEncrypted,
		);
		return res.status(200).json({ data: { loginUrl: createZerodhaLoginUrl(credentials.apiKey) } });
	} catch (error) {
		console.error("Failed to create Zerodha login URL:", error);
		return res.status(500).json({ error: "Failed to create Zerodha login URL" });
	}
}

export async function createZerodhaSession(
	req: BrokerAccountRequest & { body: ZerodhaSessionBody },
	res: Response,
) {
	const { requestToken } = req.body ?? {};
	if (typeof requestToken !== "string" || !requestToken.trim()) {
		return invalidInput(res, "requestToken is required");
	}

	try {
		const account = await findBrokerAccount(req);
		if (!account) return res.status(404).json({ error: "Broker account not found" });
		if (!account.connection?.credentialsEncrypted) {
			return res.status(409).json({ error: "Zerodha is not configured" });
		}

		const credentials = decryptBrokerData<ZerodhaCredentials>(
			account.connection.credentialsEncrypted,
		);
		const session = await exchangeZerodhaSession(
			credentials.apiKey,
			requestToken,
			credentials.apiSecret,
		);
		const connection = await prisma.brokerConnection.update({
			where: { brokerAccountId: account.id },
			data: {
				sessionEncrypted: encryptBrokerData({ accessToken: session.accessToken }),
				externalUserId: session.userId,
				sessionExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
				status: "CONNECTED",
				lastConnectedAt: session.loginTime,
			},
		});

		return res.status(200).json({
			data: {
				brokerAccountId: connection.brokerAccountId,
				externalUserId: connection.externalUserId,
				status: connection.status,
				sessionExpiresAt: connection.sessionExpiresAt,
			},
		});
	} catch (error) {
		console.error("Failed to create Zerodha session:", error);
		return res.status(502).json({ error: "Failed to create Zerodha session" });
	}
}

export async function getBrokerConnection(
	req: BrokerAccountRequest,
	res: Response,
) {
	try {
		const account = await findBrokerAccount(req);
		if (!account) return res.status(404).json({ error: "Broker account not found" });

		return res.status(200).json({
			data: {
				brokerAccountId: account.id,
				broker: account.broker,
				accountId: account.accountId,
				status: account.connection?.status ?? "DISCONNECTED",
				externalUserId: account.connection?.externalUserId ?? null,
				sessionExpiresAt: account.connection?.sessionExpiresAt ?? null,
				lastConnectedAt: account.connection?.lastConnectedAt ?? null,
			},
		});
	} catch (error) {
		console.error("Failed to fetch broker connection:", error);
		return res.status(500).json({ error: "Failed to fetch broker connection" });
	}
}
