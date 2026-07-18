"use server";

import { redirect } from "next/navigation";

export async function submitAbout(formData) {
  await fetch("https://formspree.io/f/xdaqeqle", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  redirect("/about?sent=true");
}
