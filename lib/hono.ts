import type { AppType } from "../app/api/[[...route]]/route";
import { hc } from "hono/client";


export const baseURL =
  typeof window !== "undefined"
    ? `${window.location.origin}`
    : `${process.env.NEXT_PUBLIC_APP_URL ?? ""}`;

export const client = hc<AppType>(baseURL);
