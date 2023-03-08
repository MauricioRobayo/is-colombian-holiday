import { ShareButton } from "@/components/share-button";
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
