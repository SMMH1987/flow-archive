import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

// v0.4.0 · 2026-11-21 19:30 Berlin. +database.namespace.read (read-only: heartbeat_runs, cost_events for the run trace; Siax approved 16:11 UTC). +plugin.state (only the plugin's own storage, for saved plan templates). Reads agents; creates tasks only after a human approves a plan (Siax «بله» 2026-11-21 13:02 UTC).
const manifest: PaperclipPluginManifestV1 = {
  id: "agent-map",
  apiVersion: 1,
  version: "0.4.0",
  displayName: "Agent Map · نقشهٔ ایجنت‌ها",
  description: "Live org chart and semantic mind map of the company's agents ; dynamic case planner that creates backlog tasks only after human approval.",
  author: "Siax",
  categories: ["ui"],
  capabilities: ["agents.read", "issues.create", "plugin.state.read", "plugin.state.write", "database.namespace.read", "ui.page.register", "ui.sidebar.register"],
  database: { migrationsDir: "migrations", coreReadTables: ["heartbeat_runs", "cost_events"] },
  entrypoints: { worker: "./dist/worker.js", ui: "./dist/ui" },
  ui: {
    slots: [
      { type: "page", id: "agent-map-page", displayName: "نقشهٔ ایجنت‌ها", exportName: "AgentMapPage", routePath: "agent-map" },
      { type: "sidebar", id: "agent-map-link", displayName: "نقشهٔ ایجنت‌ها", exportName: "AgentMapSidebarLink" },
    ],
  },
};

export default manifest;
