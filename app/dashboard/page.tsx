import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LeadsList } from "@/components/dashboard/LeadsList";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard | Voxlo Editing" };

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  return <LeadsList />;
}
