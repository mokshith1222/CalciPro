import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "Privacy Policy",
  description: "CalcVerse privacy policy and local data usage information.",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Privacy</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Privacy Policy</h1>
      
      <div className="mt-10 space-y-8 leading-7 text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">1. Introduction</h2>
          <p>Welcome to CalcVerse. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">2. The Data We Collect</h2>
          <p>CalcVerse is primarily a client-side application. Most calculations are performed directly in your browser and your input values are not transmitted to our servers. However, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
            <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">3. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
          <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">4. Google AdSense and Third-Party Advertising</h2>
          <p>We use Google AdSense to publish ads on our website. When you view or click on an ad, a cookie may be set to help better provide advertisements that may be of interest to you on this and other websites.</p>
          <p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
          <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-cyan-500 underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">5. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">6. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us via our contact page.</p>
        </section>
      </div>
    </main>
  );
}
