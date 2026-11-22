import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

// v0.8.0 · 2026-11-22 07:10 Berlin. NEW issues.update + events.subscribe (Siax «تایید» 06:47): case step → done when its agent answered. +«تصمیم‌ها» section. v0.7.0 · 2026-11-21 19:45 Berlin. NEW read-only capabilities issues.read + issue.comments.read: case steps show status and the agent's latest answer beside each step. Needs Siax's OK before install.
const manifest: PaperclipPluginManifestV1 = {
  id: "agent-map",
  apiVersion: 1,
  version: "0.10.1",
  displayName: "Agent Map · نقشهٔ ایجنت‌ها",
  description: "Live org chart and semantic mind map of the company's agents ; dynamic case planner that creates backlog tasks only after human approval.",
  author: "Siax",
  categories: ["ui"],
  capabilities: ["agents.read", "issues.create", "plugin.state.read", "plugin.state.write", "issues.read", "issue.comments.read", "issues.update", "events.subscribe", "ui.page.register", "ui.sidebar.register"],
  entrypoints: { worker: "./dist/worker.js", ui: "./dist/ui" },
  ui: {
    slots: [
      { type: "page", id: "agent-map-page", displayName: "نقشهٔ ایجنت‌ها", exportName: "AgentMapPage", routePath: "agent-map" },
      { type: "sidebar", id: "agent-map-link", displayName: "نقشهٔ ایجنت‌ها", exportName: "AgentMapSidebarLink" },
    ],
  },
};

export default manifest;
