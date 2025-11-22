import { NextResponse } from "next/server";

import { runSearch } from "@/lib/search";
import { SearchPayload } from "@/types/search";

export async function POST(req: Request) {
  const body = (await req.json()) as SearchPayload;
  const query = body?.query ?? "";
  const filters = body?.filters;

  const data = await runSearch(query, filters);

  return NextResponse.json(data);
}

export const runtime = "nodejs";
