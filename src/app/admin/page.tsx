import { getAllRegistrations, getAdminStats } from "@/app/actions/admin";
import { getSession } from "@/app/actions/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const [regRes, stats, user] = await Promise.all([
        getAllRegistrations(),
        getAdminStats(),
        getSession()
    ]);

    if (!regRes.success) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Failed to load data</h1>
                    <p className="text-muted-foreground">Please check your database connection.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminDashboard
                initialRegistrations={regRes.data || []}
                stats={stats}
                user={user}
            />
        </div>
    );
}
