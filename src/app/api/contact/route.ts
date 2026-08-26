import { NextResponse } from "next/server";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY ?? "";

export async function POST(request: Request): Promise<NextResponse> {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || !EMAIL_PATTERN.test(email) || !message) {
    return NextResponse.json(
      { error: "Name, a valid email, and a message are required." },
      { status: 422 },
    );
  }

  if (!ACCESS_KEY) {
    console.error("WEB3FORMS_ACCESS_KEY is not configured");
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name,
        email,
        message,
        subject: "New message from your portfolio website!",
      }),
    });

    if (!upstream.ok) {
      throw new Error(`Web3Forms responded with status ${upstream.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 502 },
    );
  }
}
