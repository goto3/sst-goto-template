import { use, StackContext, StaticSite } from "sst/constructs";
import { API } from "./api.stack";

export function frontend({ stack }: StackContext) {
  const api = use(API);

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  return web;
}
