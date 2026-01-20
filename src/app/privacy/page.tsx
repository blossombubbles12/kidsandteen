export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 9, 2026</p>

                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            My Dog and I ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                            explains how we collect, use, disclose, and safeguard your information when you visit our website
                            or attend our events, including the Lagos Dog Carnival.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                        <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
                        <p className="text-muted-foreground mb-3">We may collect the following personal information:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Name, email address, and phone number</li>
                            <li>Dog's name, breed, and other pet-related information</li>
                            <li>Event registration details</li>
                            <li>Payment information (processed securely through third-party providers)</li>
                            <li>Communication preferences</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>IP address and browser type</li>
                            <li>Device information</li>
                            <li>Usage data and analytics</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground mb-3">We use your information to:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Process event registrations and manage attendance</li>
                            <li>Send event updates, newsletters, and community announcements</li>
                            <li>Improve our services and user experience</li>
                            <li>Comply with legal obligations</li>
                            <li>Prevent fraud and ensure platform security</li>
                            <li>Facilitate community interactions and forums</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                        <p className="text-muted-foreground mb-3">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li><strong>Event Partners:</strong> Sponsors and vendors at our events (with your consent)</li>
                            <li><strong>Service Providers:</strong> Third-party companies that help us operate our platform</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Guinness World Records:</strong> For verification of the world record attempt</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information.
                            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                        <p className="text-muted-foreground mb-3">You have the right to:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Object to processing of your data</li>
                            <li>Data portability</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use cookies to enhance your experience, analyze site traffic, and personalize content.
                            You can control cookies through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Our services are not directed to children under 13. We do not knowingly collect personal
                            information from children. If you believe we have collected information from a child, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by
                            posting the new policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-secondary/20 p-4 rounded-lg mt-4">
                            <p className="font-medium">Email: mydogandigroup@yahoo.com</p>
                            <p className="font-medium">Phone: 08168874616</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
