"use client";

import { useEffect, useState } from "react";
import { GlassIcon } from "./theme-toggle";

const GLASS_SELECTORS = [
    ".section-panel",
    ".surface-card",
    ".surface-subtle",
    ".project-card",
    ".nav-dock"
];

function injectGlassLayers() {
    GLASS_SELECTORS.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.querySelector(".glass-backdrop-layer")) return;
            
            const layer = document.createElement("div");
            layer.className = "glass-backdrop-layer";
            layer.setAttribute("aria-hidden", "true");
            el.insertBefore(layer, el.firstChild);
        });
    });
}

function removeGlassLayers() {
    const layers = document.querySelectorAll(".glass-backdrop-layer");
    layers.forEach(layer => layer.remove());
}

function isDarkMode(): boolean {
    return document.documentElement.getAttribute("data-theme") === "dark";
}

export function LiquidGlassToggle() {
    const [glassEnabled, setGlassEnabled] = useState(false);
    const [isThemeDark, setIsThemeDark] = useState(false);

    // Initialize theme state
    useEffect(() => {
        const darkMode = isDarkMode();
        setIsThemeDark(darkMode);

        // Enable glass by default in light mode only
        if (!darkMode) {
            setGlassEnabled(true);
        }
    }, []);

    // Sync glass mode with state
    useEffect(() => {
        const root = document.documentElement;

        if (!isThemeDark && glassEnabled) {
            root.classList.add("glass-mode");
            injectGlassLayers();
        } else {
            root.classList.remove("glass-mode");
            removeGlassLayers();
        }
    }, [isThemeDark, glassEnabled]);

    // Watch for theme changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const nowDark = isDarkMode();
            setIsThemeDark(nowDark);
            
            if (nowDark) {
                setGlassEnabled(false);
            }
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"]
        });

        return () => observer.disconnect();
    }, []);

    const toggle = () => {
        if (isThemeDark) return;
        setGlassEnabled(!glassEnabled);
    };

    if (isThemeDark) {
        return null;
    }

    return (
        <button
            type="button"
            className={`liquid-glass-toggle${glassEnabled ? " liquid-glass-toggle--on" : ""}`}
            aria-pressed={glassEnabled}
            aria-label="Toggle glass effect"
            disabled={false}
            onClick={toggle}
            title="Glass effect"
        >
            <GlassIcon />
            <span className="liquid-glass-toggle__label toggle-label">Glass</span>
            <span className={`liquid-glass-toggle__pill ${glassEnabled ? "liquid-glass-toggle__pill--on" : ""}`}>
                {glassEnabled ? "On" : "Off"}
            </span>
        </button>
    );
}
