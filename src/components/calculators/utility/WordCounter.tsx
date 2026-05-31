"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: characters },
    { label: "Chars (No Space)", value: charsNoSpaces },
    { label: "Sentences", value: sentences },
    { label: "Reading Time", value: `${readingTime} min read` },
  ];

  return (
    <div className="space-y-8">
      <textarea
        className="w-full h-64 p-6 rounded-2xl bg-zinc-900 border-zinc-800 text-white focus:ring-2 ring-primary outline-none text-lg"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-zinc-500 font-bold uppercase">{s.label}</p>
              <p className="text-xl font-black text-white mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}