import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/pages/home/index" },
    { path: "/turntable", component: "turntable/index" },
    { path: "/docs", component: "docs" },
    { path: "/detail/:id", component: "@/pages/detail/[id]/index" },
  ],
  npmClient: 'pnpm',
});
