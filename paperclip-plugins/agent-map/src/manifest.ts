import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

// v0.6.3 · 2026-11-21 19:20 Berlin. No new capabilities. Real-test fixes: subtasks list their prerequisite tasks and where to read their output; broken-encoding templates hidden. 0.6.2: model stays on the agent.
const manifest: PaperclipPluginManifestV1 = {
  id: "agent-map",
  apiVersion: 1,
  version: "0.6.3",
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
