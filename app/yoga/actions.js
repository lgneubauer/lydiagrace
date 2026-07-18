"use server";

import { redirect } from "next/navigation";

export async function submitYoga(formData) {
  await fetch("https://formspree.io/f/mbdngnld", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  redirect("/yoga?sent=true");
}
