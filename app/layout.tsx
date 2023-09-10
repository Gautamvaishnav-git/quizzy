import ProgressBar from "@/components/ProgressBar";
import { Navbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Metadata } from "next";
import { Providers } from "./providers";
import "@/styles/globals.css";
import BottomNavigation from "@/components/BottomNavigation";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <ProgressBar />
            <Navbar />
            <BottomNavigation />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
