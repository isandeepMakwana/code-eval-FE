import type { EvaluationPayload } from "@/types";

export async function submitToServer(
  serverUrl: string,
  payload: EvaluationPayload
) {
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
