import type { Metadata } from "next";
import "./globals.css";
import { Toaster, toast } from 'sonner'
import { getCurrentUser } from "@/lib/session";
import { ThemeProvider } from "@/components/theme-provider"
import HuddleContextProvider from "@/components/ClientComponents/HuddleContextProvider";
import { cn } from "@/utils/helpers";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genple",
  description: "Huddle01 Hackathon Submission.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={cn("min-h-screen relative font-inter", inter.className)}>      <Toaster />
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
              <Navbar />
              <HuddleContextProvider>{children}</HuddleContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
