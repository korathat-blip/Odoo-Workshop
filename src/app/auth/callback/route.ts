import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles the OAuth redirect from Supabase/Google and exchanges the
// authorization code for a session cookie.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — send the user back to login.
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
