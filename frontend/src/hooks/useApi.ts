import { useEffect, useState } from "react";

const API_URL = "https://kunal47-api.duckdns.org";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(path: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    setState({ data: null, loading: true, error: null });

    fetch(`${API_URL}/api${path}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            (await res.json().catch(() => null))?.error || "Request failed"
          );
        }

        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err.message,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}

export async function postContact(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Failed to send message");
  }

  return data;
}
