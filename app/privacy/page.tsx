import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"

export const metadata: Metadata = {
  title: "Privacy Policy | RK INSTITUTION",
  description: "Privacy policy for RK INSTITUTION",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-1/4 mb-8 md:mb-0 sticky top-8 self-start z-10">
        <nav>
          <NavigationMenu>
            <NavigationMenuList className="flex-col space-y-2 bg-white/70 dark:bg-background/70 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-border">
              <NavigationMenuItem>
                <NavigationMenuLink href="#introduction">Introduction</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#info">Information We Collect</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#use">How We Use Your Information</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#sharing">Information Sharing</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#security">Data Security</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#rights">Your Rights</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#contact">Contact Us</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-emerald-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">Privacy Policy</h1>
          <Badge variant="secondary">Last updated: April 19, 2025</Badge>
        </div>
        <Alert className="mb-6 animate-fadeIn">
          <AlertTitle>Summary</AlertTitle>
          <AlertDescription>
            We value your privacy and are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.
          </AlertDescription>
        </Alert>
        <div className="space-y-8">
          {/* Section Cards */}
          <section id="introduction" className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp">
            <h2 className="text-2xl font-bold mb-2">1. Introduction</h2>
            <p>
              At RK INSTITUTION, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>
          <section id="info" className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp">
            <h2 className="text-2xl font-bold mb-2">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc ml-6">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Course progress and completion data</li>
              <li>Communication preferences</li>
            </ul>
          </section>
          <section id="use" className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp">
            <h2 className="text-2xl font-bold mb-2">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-6">
              <li>Provide and maintain our services</li>
              <li>Process your payments</li>
              <li>Send you important updates and notifications</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          <section id="sharing" className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp">
            <h2 className="text-2xl font-bold mb-2">4. Information Sharing</h2>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc ml-6">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Third parties with your consent</li>
            </ul>
          </section>
          <section id="security" className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp">
            <h2 className="text-2xl font-bold mb-2">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
            <Badge variant="outline">Tip: Always use a strong password and keep your credentials safe.</Badge>
          </section>
          <section id="rights" className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp">
            <h2 className="text-2xl font-bold mb-2">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>
          <section id="contact" className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp">
            <h2 className="text-2xl font-bold mb-2">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <Badge variant="secondary">privacy@rkinstitution.com</Badge>
            </p>
          </section>
        </div>
        {/* FAQ Accordion */}
        <div className="mt-10 animate-fadeInUp">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq1">
              <AccordionTrigger>Can I request deletion of my data?</AccordionTrigger>
              <AccordionContent>
                Yes, you can request deletion of your personal information at any time by contacting us.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq2">
              <AccordionTrigger>How do you secure my payment information?</AccordionTrigger>
              <AccordionContent>
                We use industry-standard encryption and partner with secure payment providers to protect your payment data.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq3">
              <AccordionTrigger>Will my data be shared with third parties?</AccordionTrigger>
              <AccordionContent>
                We only share your data with trusted service providers or when required by law, and never sell your information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}