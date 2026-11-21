import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

// v0.4.1 · 2026-11-21 17:35 Berlin. Database block removed (server needs database.namespace.migrate for it, not approved). Run trace shows "unavailable" until approved.
const manifest: PaperclipPluginManifestV1 = {
  id: "agent-map",
  apiVersion: 1,
  version: "0.4.1",
  displayName: "Agent Map · نقشهٔ ایجنت‌ها",
  description: "Live org chart and semantic mind map of the company's agents ; dynamic case planner that creates backlog tasks only after human approval.",
  author: "Siax",
  categories: ["ui"],
  capabilities: ["agents.read", "issues.create", "plugin.state.read", "plugin.state.write", "ui.page.register", "ui.sidebar.register"],
  entrypoints: { worker: "./dist/worker.js", ui: "./dist/ui" },
  ui: {
    slots: [
      { type: "page", id: "agent-map-page", displayName: "نقشهٔ ایجنت‌ها", exportName: "AgentMapPage", routePath: "agent-map" },
      { type: "sidebar", id: "agent-map-link", displayName: "نقشهٔ ایجنت‌ها", exportName: "AgentMapSidebarLink" },
    ],
  },
};

export default manifest;
