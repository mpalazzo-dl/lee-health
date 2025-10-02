import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { fetchEntryData } from "@aces/contentful";

export async function GET(request: Request) {
  const draft = await draftMode();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const locale = searchParams.get("locale");

  if (!id) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!locale) {
    return new Response("Invalid locale", { status: 401 });
  }

  const entryData = await fetchEntryData(id, true, locale);

  if (!entryData[0]) {
    return new Response("Invalid id", { status: 401 });
  }

  draft.enable();

  const cookieStore = await cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  cookieStore.set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  redirect(`/draft/entries?id=${id}`);
}
