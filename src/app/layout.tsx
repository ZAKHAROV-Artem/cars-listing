import Providers from "@/providers";
import "@/assets/styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { Poppins } from "next/font/google";
import Script from 'next/script'

const GTM_ID = 'GTM-TVZ9PL2C';

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL as string),
  title: "Cars for sale in Ethiopia, get latest car prices in Ethiopia page 1",
  applicationName: "Mekina.net",
  authors: [
    { name: "Artem Zakharov", url: "https://zakharov-artem.vercel.app/" },
  ],
  robots: "index, follow",
  generator: "Next.js",
  keywords: "used car price in ethiopia 2021, car price in ethiopia, car market in ethiopia, car for sale in ethiopia, new car price in ethiopia 2021, buy and sell cars, suzuki car price in ethiopia, car sales in ethiopia, car sell in ethiopia, cars for sale in ethiopia, used car price in ethiopia, diplomatic car for sale in ethiopia 2021",
  description:
    "Looking for car for sale in Ethiopia? Used and new cars in Ethiopia? Get daily updates of car prices posted directly from private owners, car dealers and brokers in Ethiopia.",
  twitter: {
    card: "summary_large_image",
    title:
      "Cars for sale in Ethiopia, get latest car prices in Ethiopia results page 1",
    site: "@mekinanet",
    creator: "@mekinanet",
    description:
      "Looking for car for sale in Ethiopia? Used and new cars in Ethiopia? Get daily updates of car prices posted directly from private owners, car dealers and brokers in Ethiopia.",
  },
  openGraph: {
    title: `${process.env.DOMAIN} - Buy, Sell or rent cars online in Ethiopia`,
    description:
      "በኢትዮጵያ የኢንተርኔት የመኪና መገበያያ ድረገጽ - Ethiopian online cars marketplace - Used cars, new cars, rental cars.",
    type: "website",
    locale: "en_us",
    url: process.env.NEXTAUTH_URL,
    siteName: process.env.DOMAIN,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
    </Script>
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}

          <Footer />
        </Providers>
        <noscript
        dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }} 
    />
      </body>
    </html>
  );
}
