import type {
  Request,
  Response,
} from "express";

import {
  loginService,
} from "../services/auth.service";
import {
  completeUserOnboardingService,
  getUserOnboardingSummary,
} from "../services/user.service";

type LoginBody = {
  email: string;
  password: string;
};

export async function login(
  req: Request<
    {},
    {},
    LoginBody
  >,
  res: Response,
) {
  try {
    const {
      email,
      password,
    } = req.body ?? ({} as LoginBody);

    if (
      typeof email !== "string" || !email.trim() ||
      typeof password !== "string" || !password
    ) {
      return res.status(400).json({
        error:
          "Email and password are required",
      });
    }

    const result =
      await loginService(
        email,
        password,
      );

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    if (message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        error:
          "Invalid email or password",
      });
    }

    if (message === "ACCOUNT_SETUP_REQUIRED") {
      return res.status(409).json({
        error:
          "Account setup is required. Use the invitation link from your administrator.",
      });
    }

    if (message === "ACCOUNT_DISABLED") {
      return res.status(403).json({
        error:
          "This account is disabled. Contact your administrator.",
      });
    }

    console.error(
      "Login failed:",
      error,
    );

    return res.status(500).json({
      error: "Login failed",
    });
  }
}

function handleOnboardingError(
  res: Response,
  error: unknown,
) {
  const message =
    error instanceof Error
      ? error.message
      : "UNKNOWN_ERROR";

  if (
    message ===
      "USER_ONBOARDING_LINK_INVALID"
  ) {
    return res.status(404).json({
      error:
        "This account setup link is invalid.",
    });
  }

  if (
    message ===
      "USER_ONBOARDING_LINK_EXPIRED"
  ) {
    return res.status(410).json({
      error:
        "This account setup link has expired or was already used. Ask an administrator for a new link.",
    });
  }

  if (message === "ACCOUNT_DISABLED") {
    return res.status(403).json({
      error:
        "This account is disabled. Contact your administrator.",
    });
  }

  if (
    message ===
      "PASSWORD_REQUIREMENTS_NOT_MET"
  ) {
    return res.status(400).json({
      error:
        "Password must be between 12 and 128 characters.",
    });
  }

  console.error(
    "Account setup failed:",
    error,
  );

  return res.status(500).json({
    error:
      "Account setup failed",
  });
}

export async function lookupOnboarding(
  req: Request,
  res: Response,
) {
  try {
    const data =
      await getUserOnboardingSummary(
        req.body?.token,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return handleOnboardingError(
      res,
      error,
    );
  }
}

export async function completeOnboarding(
  req: Request,
  res: Response,
) {
  try {
    const data =
      await completeUserOnboardingService(
        req.body?.token,
        req.body?.password,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return handleOnboardingError(
      res,
      error,
    );
  }
}
