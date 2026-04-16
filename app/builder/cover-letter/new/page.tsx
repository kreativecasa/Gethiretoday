"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewCoverLetterPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cover-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Untitled Cover Letter",
        template_id: "professional",
        data: {},
        contact: {},
      }),
    })
      .then((r) => r.json())
      .then(({ coverLetter }) => {
        if (coverLetter?.id) {
          router.replace(`/builder/cover-letter/${coverLetter.id}`);
        } else {
          router.replace("/dashboard");
        }
      })
      .catch(() => router.replace("/dashboard"));
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#4AB7A6" }} />
        <p className="text-sm font-medium">Creating cover letter…</p>
      </div>
    </div>
  );
}
