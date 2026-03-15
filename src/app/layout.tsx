/**
 * Defines the root App Router layout and global metadata for the marketing
 * site.
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { config } from "@/config/config";
import { Footer } from "@/features/marketing/sections/footer";
import { Navbar } from "@/features/marketing/sections/navbar";
import "@/styles/globals.css";

/**
 * Loads the DM Sans font family that drives the site's typography system.
 */
const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

/**
 * Supplies the default metadata shared across all routes in the App Router.
 */
export const metadata: Metadata = {
  metadataBase: new URL(config.app.url),
  applicationName: config.app.name,
  title: {
    default: `${config.app.name} — Autonomous Drone Response for Disasters`,
    template: `%s | ${config.app.name}`,
  },
  description:
    "GPS-denied autonomous drone swarms for disaster response. Simulation-first safety. Immutable blockchain audit trail. ResQ coordinates swarms before the first responder arrives.",
  keywords: [
    "autonomous drones",
    "disaster response",
    "swarm robotics",
    "GPS-denied",
    "search and rescue",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.app.url,
    siteName: config.app.name,
    title: `${config.app.name} — Autonomous Drone Response for Disasters`,
    description: "GPS-denied autonomous drone swarms for disaster response.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.app.name} — Autonomous Drone Response for Disasters`,
    description: "GPS-denied autonomous drone swarms for disaster response.",
  },
};

/**
 * Renders the root HTML shell for every page in the application.
 *
 * @param props - The layout props provided by the App Router.
 * @param props.children - The route content to render inside the shared shell.
 * @returns The root document structure for the marketing site.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
