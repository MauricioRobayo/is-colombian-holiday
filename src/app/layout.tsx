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
        <Footer />
      </body>
    </html>
  );
}
