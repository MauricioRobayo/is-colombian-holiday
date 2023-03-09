import { ShareButton } from "@/components/share-button";
import { Metadata } from "next";
import { HiOutlineShare } from "react-icons/hi";
import { Footer } from "../components/footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex h-screen flex-col justify-between bg-slate-100 text-slate-600">
        {children}
        <ShareButton className="mb-8 w-fit self-center">
          Share this page <HiOutlineShare />
        </ShareButton>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Colombian Holidays",
    template: "%s | Colombian Holidays",
  },
  description: "List of upcoming holidays in Colombia",
  keywords: ["holidays", "Colombia", "public holidays", "vacations"],
  icons: {
    icon: "/favicon.png",
  },
  // openGraph: {
  //   title: "Colombian Holidays",
  //   description: "Public Holidays in Colombia",
  //   url: "https://iscolombian.holiday",
  //   siteName: "Colombian Holidays",
  //   images: [
  //     {
  //       url: "https://nextjs.org/og.png",
  //       width: 800,
  //       height: 600,
  //     },
  //     {
  //       url: "https://nextjs.org/og-alt.png",
  //       width: 1800,
  //       height: 1600,
  //       alt: "My custom alt",
  //     },
  //   ],
  //   locale: "en-US",
  //   type: "website",
  // },
};
