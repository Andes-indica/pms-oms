import type {
  Request,
  Response,
} from "express";

import {
  loginService,
} from "../services/auth.service";

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
    if (
      error instanceof Error &&
      error.message ===
        "INVALID_CREDENTIALS"
    ) {
      return res.status(401).json({
        error:
          "Invalid email or password",
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
