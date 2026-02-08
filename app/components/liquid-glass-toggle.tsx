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

export function LiquidGlassToggle() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add("glass-mode");
        injectGlassLayers();
        setEnabled(true);
    }, []);

    const toggle = () => {
        if (enabled) {
            document.documentElement.classList.remove("glass-mode");
            removeGlassLayers();
            setEnabled(false);
            return;
        }

        document.documentElement.classList.add("glass-mode");
        injectGlassLayers();
        setEnabled(true);
    };

    return (
        <button
            type="button"
            className={`liquid-glass-toggle${enabled ? " liquid-glass-toggle--on" : ""}`}
            aria-pressed={enabled}
            aria-label="Toggle glass effect"
            disabled={false}
            onClick={toggle}
            title="Glass effect"
        >
            <GlassIcon />
            <span className="liquid-glass-toggle__label toggle-label">Glass</span>
            <span className={`liquid-glass-toggle__pill ${enabled ? "liquid-glass-toggle__pill--on" : ""}`}>
                {enabled ? "On" : "Off"}
            </span>
        </button>
    );
}
