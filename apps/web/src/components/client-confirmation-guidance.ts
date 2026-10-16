const CONFIRMATION_ERRORS: Record<
  string,
  string
> = {
  CLIENT_CONFIRMATION_LINK_INVALID:
    "This confirmation link is invalid or has been replaced. Ask your portfolio manager for a new link.",
  CLIENT_CONFIRMATION_LINK_EXPIRED:
    "This confirmation link has expired. Ask your portfolio manager to create a new link.",
  CLIENT_CONFIRMATION_NOT_ACTIVE:
    "This confirmation is no longer active. It may already have been completed, declined, or replaced.",
  CLIENT_CONFIRMATION_HANDOFF_IN_PROGRESS:
    "This order has already been opened in Zerodha. Check the intended Kite account before taking any further action.",
  ZERODHA_CALLBACK_STATUS_UNCERTAIN:
    "Zerodha did not return a complete result. Check the Kite order book and ask the portfolio manager to reconcile the outcome.",
  ZERODHA_PUBLISHER_API_KEY_NOT_CONFIGURED:
    "The trading link is temporarily unavailable because the Publisher application is not configured.",
};

export function getClientConfirmationGuidance(
  error: unknown,
) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  return (
    CONFIRMATION_ERRORS[message] ??
    "Unable to open this confirmation. Ask your portfolio manager to verify the link before trying again."
  );
}
