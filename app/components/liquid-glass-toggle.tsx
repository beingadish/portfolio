"use client";

import { useEffect, useState } from "react";
import { GlassIcon } from "./theme-toggle";

export function LiquidGlassToggle() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add("glass-mode");
        setEnabled(true);
    }, []);

    const toggle = () => {
        if (enabled) {
            document.documentElement.classList.remove("glass-mode");
            setEnabled(false);
            return;
        }

        document.documentElement.classList.add("glass-mode");
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
