import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  try {
    const body = await req.json();
    const { name, email, projectType, budget, timeline, message } = body;

    if (!name?.trim() || !email?.trim() || !projectType) {
      return NextResponse.json({ error: "Name, email, and project type are required." }, { status: 400 });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { data, error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      project_type: projectType,
      budget: budget ?? null,
      timeline: timeline ?? null,
      message: message?.trim() ?? null,
      status: "new",
    }).select().single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
    }

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Voxlo Leads <leads@voxloediting.com>",
          to: process.env.ADMIN_EMAIL,
          subject: `New lead from ${name} — ${projectType}`,
          html: `
            <h2>New lead from ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project type:</strong> ${projectType}</p>
            <p><strong>Budget:</strong> ${budget ?? "Not specified"}</p>
            <p><strong>Timeline:</strong> ${timeline ?? "Not specified"}</p>
            ${message ? `<p><strong>Notes:</strong> ${message}</p>` : ""}
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://voxloediting.com"}/dashboard">View in dashboard →</a></p>
          `,
        });
      } catch (emailErr) {
        // Don't fail the request if email notification fails
        console.error("Email notification failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
