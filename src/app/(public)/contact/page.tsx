import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-secondary/5 pt-24 pb-20">
            <div className="container px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
