"use server";

import { redirect } from "next/navigation";

export async function submitFood(formData) {
  await fetch("https://formspree.io/f/mrenpngb", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  redirect("/food?sent=true");
}
