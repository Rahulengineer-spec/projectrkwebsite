import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"

export const metadata: Metadata = {
  title: "Terms of Service | RK INSTITUTION",
  description: "Terms and conditions for using RK INSTITUTION's services",
}

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing and using RK INSTITUTION's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      "We reserve the right to modify these terms at any time. Your continued use of the service after any changes indicates your acceptance of the modified terms.",
    ],
  },
  {
    title: "2. User Accounts",
    content: [
      "To access certain features of our platform, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
      "You must provide accurate and complete information when creating your account. You may not use another person's account without their permission.",
      "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful activities.",
    ],
  },
  {
    title: "3. Course Enrollment and Access",
    content: [
      "Course enrollment is subject to payment of applicable fees. Upon successful payment, you will be granted access to the course materials.",
      "Course access is granted for personal, non-commercial use only. You may not share your login credentials or course materials with others.",
      "We reserve the right to modify or discontinue any course at any time. In such cases, enrolled students will be notified and may be offered alternative options.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All content on our platform, including courses, materials, logos, and designs, is protected by copyright and other intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works of our content without explicit permission.",
      "Your use of our platform does not grant you any ownership rights to our intellectual property.",
    ],
  },
  {
    title: "5. User Content",
    content: [
      "You retain ownership of any content you submit to our platform, but you grant us a license to use, modify, and distribute it for the purpose of providing our services.",
      "You are responsible for ensuring that your content does not violate any laws or infringe on the rights of others.",
      "We reserve the right to remove any content that violates these terms or that we deem inappropriate.",
    ],
  },
  {
    title: "6. Payment and Refunds",
    content: [
      "All payments are processed securely through our payment gateway. You agree to provide accurate payment information.",
      "Refunds are available within 30 days of purchase, subject to our refund policy. To request a refund, contact our support team.",
      "We reserve the right to change our pricing at any time. Price changes will not affect existing enrollments.",
    ],
  },
  {
    title: "7. Privacy",
    content: [
      "Your use of our services is also governed by our Privacy Policy. Please review it to understand how we collect and use your information.",
      "We implement security measures to protect your personal information, but we cannot guarantee absolute security.",
      "You are responsible for maintaining the security of your account and personal information.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    content: [
      "Our platform is provided 'as is' without warranties of any kind. We do not guarantee that our services will be uninterrupted or error-free.",
      "We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.",
      "Our total liability for any claims related to our services is limited to the amount you paid for the specific course or service in question.",
    ],
  },
  {
    title: "9. Termination",
    content: [
      "We may terminate or suspend your account and access to our services at any time, with or without cause.",
      "Upon termination, you will lose access to all course materials and services.",
      "Sections of these terms that should survive termination will continue to apply.",
    ],
  },
  {
    title: "10. Governing Law",
    content: [
      "These terms are governed by the laws of the jurisdiction where RK INSTITUTION is registered.",
      "Any disputes arising from these terms will be resolved in the courts of that jurisdiction.",
      "If any provision of these terms is found to be invalid, the remaining provisions will remain in effect.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-1/4 mb-8 md:mb-0 sticky top-8 self-start z-10">
        <nav>
          <NavigationMenu>
            <NavigationMenuList className="flex-col space-y-2 bg-white/70 dark:bg-background/70 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-border">
              {termsSections.map((section, idx) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuLink href={`#section${idx + 1}`}>{section.title.replace(/\d+\. /, '')}</NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-emerald-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">Terms of Service</h1>
          <Badge variant="secondary">Last updated: March 15, 2024</Badge>
        </div>
        <Alert className="mb-6 animate-fadeIn">
          <AlertTitle>Summary</AlertTitle>
          <AlertDescription>
            Please read these terms carefully before using our services. They outline your rights, responsibilities, and important limitations.
          </AlertDescription>
        </Alert>
        <div className="space-y-8">
          {termsSections.map((section, idx) => (
            <section id={`section${idx + 1}`} className="rounded-2xl bg-card/80 shadow-md p-6 transition-all duration-300 hover:shadow-xl scroll-mt-24 animate-fadeInUp mb-8" key={section.title}>
              <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
              <ul className="list-disc ml-6">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        {/* FAQ Accordion */}
        <div className="mt-10 animate-fadeInUp">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq1">
              <AccordionTrigger>Can I get a refund after enrolling in a course?</AccordionTrigger>
              <AccordionContent>
                Refunds are available within 30 days of purchase, subject to our refund policy. Please contact support for assistance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq2">
              <AccordionTrigger>What happens if my account is terminated?</AccordionTrigger>
              <AccordionContent>
                You will lose access to all course materials and services. Some terms may continue to apply after termination.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq3">
              <AccordionTrigger>How is my personal information protected?</AccordionTrigger>
              <AccordionContent>
                Your data is protected as described in our Privacy Policy. We use security measures and never sell your information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  )
}