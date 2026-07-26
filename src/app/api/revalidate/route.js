import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { type, slug } = await request.json().catch(() => ({}));

  if (type === "course") {
    revalidatePath("/courses", "page");
    revalidatePath("/", "page");
    if (slug) revalidatePath(`/courses/${slug}`, "page");
  } else if (type === "article") {
    revalidatePath("/articles", "page");
    revalidatePath("/", "page");
    if (slug) revalidatePath(`/articles/${slug}`, "page");
  } else {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({ revalidated: true, type: type || "all" });
}
