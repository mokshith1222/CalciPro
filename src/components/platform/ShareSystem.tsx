"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareSystem({ title = "CalciPro calculator" }: { title?: string }) {
  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  return (
    <Button type="button" variant="outline" className="gap-2" onClick={() => void share()}>
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  );
}
