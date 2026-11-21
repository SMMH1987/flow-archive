// Test-only stand-in for @paperclipai/plugin-sdk/ui: every call goes to the REAL worker running in the test harness (via Playwright exposeFunction).
import { useCallback, useEffect, useState } from "react";
export function useHostContext() { return { companyId: "c1", companyPrefix: "SMMH" }; }
export function usePluginData(key, params) {
  const p = JSON.stringify(params ?? {}); const [s, set] = useState({ data: undefined, loading: true, error: null }); const [n, setN] = useState(0);
  useEffect(() => { let live = true; window.__getData(key, JSON.parse(p)).then((d) => live && set({ data: JSON.parse(d), loading: false, error: null }), (e) => live && set({ data: undefined, loading: false, error: { message: String(e) } })); return () => { live = false; }; }, [key, p, n]);
  return { ...s, refresh: useCallback(() => setN((x) => x + 1), []) };
}
export function usePluginAction(key) { return async (params) => { const r = JSON.parse(await window.__action(key, params ?? {})); if (r && r.__error) throw new Error(r.__error); return r; }; }
