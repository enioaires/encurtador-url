import { createBaseApi, handle } from "@/lib/hono-config";
import shorten from './shorten';
import redirect from './redirect';

const app = createBaseApi();

const routes = app
  .route('/shorten', shorten)
  .route('/redirect', redirect);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;