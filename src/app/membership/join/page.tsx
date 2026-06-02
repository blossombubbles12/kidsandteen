import { redirect } from "next/navigation";

export default async function MembershipJoinRedirect({
    searchParams,
}: {
    searchParams: Promise<{ plan?: string }>;
}) {
    const { plan } = await searchParams;
    const query = plan ? `?plan=${plan}` : "";
    redirect(`/join${query}`);
}
