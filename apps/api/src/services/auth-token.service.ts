import {
  SignJWT,
  jwtVerify,
} from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const secretKey =
  new TextEncoder().encode(secret);

export type AuthTokenPayload = {
  userId: string;
  firmId: string;
  role:
    | "ADMIN"
    | "PORTFOLIO_MANAGER"
    | "OPERATIONS"
    | "VIEWER";
};

export async function createAccessToken(
  payload: AuthTokenPayload,
) {
  return new SignJWT({
    firmId: payload.firmId,
    role: payload.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(
      process.env.JWT_EXPIRES_IN ?? "8h",
    )
    .sign(secretKey);
}

export async function verifyAccessToken(
  token: string,
): Promise<AuthTokenPayload> {
  const { payload } =
    await jwtVerify(token, secretKey);

  const allowedRoles: AuthTokenPayload["role"][] = [
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
    "VIEWER",
  ];

  if (
    !payload.sub ||
    typeof payload.firmId !== "string" ||
    typeof payload.role !== "string" ||
    !allowedRoles.includes(payload.role as AuthTokenPayload["role"])
  ) {
    throw new Error("INVALID_TOKEN");
  }

  return {
    userId: payload.sub,
    firmId: payload.firmId,
    role: payload.role as AuthTokenPayload["role"],
  };
}
