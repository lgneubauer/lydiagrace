"use server";

import { redirect } from "next/navigation";

export async function submitAstro(formData) {
  await fetch("https://formspree.io/f/mjgnynkw", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  redirect("/astro-reading?sent=true");
}
