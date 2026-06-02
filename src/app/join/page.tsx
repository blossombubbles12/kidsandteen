import RegistrationWizard from "@/components/registration/RegistrationWizard";

export default async function JoinPage({
    searchParams,
}: {
    searchParams: Promise<{ plan?: string }>;
}) {
    const { plan } = await searchParams;
    return (
        <div>
            <RegistrationWizard plan={plan} />
        </div>
    );
}
