"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { EMAIL } from "@/lib/config/constants";

type Status = "idle" | "copied" | "error";

export function CopyEmail() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2200);
    return () => clearTimeout(t);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-foreground/40 active:scale-[0.98]"
    >
      {status === "copied" ? <Check className="size-4 text-signal" /> : <Copy className="size-4" />}
      <span aria-live="polite">
        {status === "copied" ? "Copied" : status === "error" ? "Copy failed, select the address" : "Copy address"}
      </span>
    </button>
  );
}
