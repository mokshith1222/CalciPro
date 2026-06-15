import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/cookies",
  title: "Cookie Policy – CalciPro Browser Storage & Data Practices",
  description: "Understand how CalciPro uses browser cookies and local storage to save your calculator history and preferences. No personal data is collected or shared.",
});

export default function CookiesPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Technical</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Cookie Policy</h1>
      
      <div className="mt-10 space-y-8 leading-7 text-muted-foreground text-lg">
        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">1. What are cookies?</h2>
          <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">2. How we use cookies</h2>
          <p>CalciPro uses cookies for several purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> These are necessary for the website to function, such as storing your theme preference and interface settings.</li>
            <li><strong>Preference Cookies:</strong> We use local storage to remember your "Favorite" calculators and your recent calculation history.</li>
            <li><strong>Advertising Cookies:</strong> We use Google AdSense cookies to show you relevant advertisements based on your interests.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">3. Third-party cookies</h2>
          <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements through Google AdSense.</p>
          <p>Google use cookies to serve ads based on your prior visits to our website or other websites on the Internet.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-black text-white">4. Your choices regarding cookies</h2>
          <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.</p>
          <p>Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>
        </section>
      </div>
    </main>
  );
}
