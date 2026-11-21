import { createRoot } from "react-dom/client";
import { AgentMapPage } from "../src/ui/index.js";
createRoot(document.getElementById("root")!).render(<AgentMapPage {...({} as any)} />);
