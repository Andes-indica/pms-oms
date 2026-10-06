const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://127.0.0.1:3000";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    localStorage.getItem("accessToken");

  const headers = new Headers(
    options.headers,
  );

  headers.set(
    "Content-Type",
    "application/json",
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      headers,
    },
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(
      body.error ??
        "Request failed",
    );
  }

  return body;
}

export type LiveUpdateEvent = {
  type: string;
  entityType: string;
  entityId: string;
  occurredAt: string;
};

export async function subscribeToLiveUpdates(
  onEvent: (
    event: LiveUpdateEvent,
  ) => void,
  signal?: AbortSignal,
) {
  const token =
    localStorage.getItem(
      "accessToken",
    );

  const headers =
    new Headers();

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const response =
    await fetch(
      `${API_URL}/api/events`,
      {
        headers,
        signal,
      },
    );

  if (
    !response.ok ||
    !response.body
  ) {
    throw new Error(
      "Failed to connect live updates",
    );
  }

  const reader =
    response.body
      .getReader();

  const decoder =
    new TextDecoder();

  let buffer = "";

  while (true) {
    const {
      value,
      done,
    } =
      await reader.read();

    if (done) {
      break;
    }

    buffer +=
      decoder.decode(
        value,
        {
          stream: true,
        },
      );

    let boundary =
      buffer.indexOf(
        "\n\n",
      );

    while (
      boundary !== -1
    ) {
      const block =
        buffer.slice(
          0,
          boundary,
        );

      buffer =
        buffer.slice(
          boundary + 2,
        );

      const data =
        block
          .split("\n")
          .filter(
            (line) =>
              line.startsWith(
                "data:",
              ),
          )
          .map(
            (line) =>
              line.slice(5)
                .trimStart(),
          )
          .join("\n");

      if (data) {
        try {
          onEvent(
            JSON.parse(
              data,
            ) as LiveUpdateEvent,
          );
        } catch {
          // Ignore malformed stream events.
        }
      }

      boundary =
        buffer.indexOf(
          "\n\n",
        );
    }
  }
}
