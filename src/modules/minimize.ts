import { invoke } from "@tauri-apps/api/core";
import { capsule, collapsedIndicator } from "../dom";
import { isMinimized, setIsMinimized } from "../state";

function minimizePanel() {
  if (isMinimized) return;
  setIsMinimized(true);

  capsule.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)";
  capsule.style.transform = "translateX(-50%) scale(0)";
  capsule.style.opacity = "0";
  capsule.style.pointerEvents = "none";

  setTimeout(() => {
    capsule.style.display = "none";
    capsule.style.transform = "";
    capsule.style.opacity = "";
    capsule.style.transition = "";
    collapsedIndicator.style.display = "block";
  }, 300);
}

function expandFromMinimized() {
  if (!isMinimized) return;
  setIsMinimized(false);
  collapsedIndicator.style.display = "none";

  capsule.style.position = "fixed";
  capsule.style.left = "50%";
  capsule.style.top = "11px";
  capsule.style.transform = "translateX(-50%)";
  capsule.style.display = "";
  capsule.style.pointerEvents = "";
  capsule.style.opacity = "0";
  capsule.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)";

  requestAnimationFrame(() => {
    capsule.style.opacity = "1";
    capsule.style.transform = "translateX(-50%) scale(1)";
  });

  setTimeout(() => {
    capsule.style.transition = "";
  }, 320);
}

export function initMinimize() {
  // Right-click context menu (handled by Rust Win32)
  capsule.addEventListener("contextmenu", (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    invoke("show_context_menu");
  });

  // Listen for minimize action from Rust context menu
  import("@tauri-apps/api/event").then(({ listen }) => {
    listen<string>("context-menu-action", (event) => {
      if (event.payload === "minimize") {
        minimizePanel();
      }
    });
  });

  // Click collapsed indicator to expand
  collapsedIndicator.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    expandFromMinimized();
  });
}
