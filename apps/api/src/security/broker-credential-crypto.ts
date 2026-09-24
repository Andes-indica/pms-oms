import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

function getKey(): Buffer {
  const encoded =
    process.env
      .BROKER_CREDENTIAL_ENCRYPTION_KEY;

  if (!encoded) {
    throw new Error(
      "BROKER_CREDENTIAL_ENCRYPTION_KEY_MISSING",
    );
  }

  const key =
    Buffer.from(
      encoded,
      "base64",
    );

  if (key.length !== 32) {
    throw new Error(
      "BROKER_CREDENTIAL_ENCRYPTION_KEY_INVALID",
    );
  }

  return key;
}

export function encryptBrokerData(
  value: unknown,
): string {
  const key = getKey();

  const iv =
    randomBytes(12);

  const cipher =
    createCipheriv(
      "aes-256-gcm",
      key,
      iv,
    );

  const plaintext =
    JSON.stringify(value);

  const encrypted =
    Buffer.concat([
      cipher.update(
        plaintext,
        "utf8",
      ),
      cipher.final(),
    ]);

  const tag =
    cipher.getAuthTag();

  return [
    "v1",
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

export function decryptBrokerData<T>(
  value: string,
): T {
  const [
    version,
    ivEncoded,
    tagEncoded,
    dataEncoded,
  ] = value.split(".");

  if (
    version !== "v1" ||
    !ivEncoded ||
    !tagEncoded ||
    !dataEncoded
  ) {
    throw new Error(
      "INVALID_ENCRYPTED_BROKER_DATA",
    );
  }

  const decipher =
    createDecipheriv(
      "aes-256-gcm",
      getKey(),
      Buffer.from(
        ivEncoded,
        "base64url",
      ),
    );

  decipher.setAuthTag(
    Buffer.from(
      tagEncoded,
      "base64url",
    ),
  );

  const plaintext =
    Buffer.concat([
      decipher.update(
        Buffer.from(
          dataEncoded,
          "base64url",
        ),
      ),
      decipher.final(),
    ]);

  return JSON.parse(
    plaintext.toString("utf8"),
  ) as T;
}