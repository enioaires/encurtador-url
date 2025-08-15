import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle as vercelHandle } from "hono/vercel";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export function createBaseApi() {
  return new Hono().basePath("/api").use(
    cors({
      origin: "*",
      allowMethods: ["*"],
      allowHeaders: ["*"],
      exposeHeaders: ["*"],
      credentials: true,
    })
  );
}

export const handle = vercelHandle;