import "@/styles/main.css";

import type { Metadata } from "next";

import * as Theme from "@/components/theme";
import { OpenGraph } from "@/lib/og";

import clsx from "clsx";
import { ViewTransitions } from "next-view-transitions";
import { EB_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";

export const metadata: Metadata = {
  ...OpenGraph,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const sfPro = localFont({
  src: [
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-UltralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-BlackItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-HeavyItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Black.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Heavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});

const newsreader = EB_Garamond({
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(inter.className, newsreader.variable, sfPro.variable)}
      suppressHydrationWarning
    >
      <body>
        <ViewTransitions>
          <Theme.Provider>
            <main className="mx-auto max-w-screen-sm overflow-x-hidden px-4 py-12 md:overflow-x-visible">
              {/* <div className="pointer-events-none fixed top-0 left-0 z-50 h-32 w-full">
                <div
                  className="user-select-none pointer-events-none block h-full dark:hidden"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #fff 0%, hsla(0, 0%, 100%, 0.738) 19%, hsla(0, 0%, 100%, 0.541) 34%, hsla(0, 0%, 100%, 0.382) 47%, hsla(0, 0%, 100%, 0.278) 56.5%, hsla(0, 0%, 100%, 0.194) 65%, hsla(0, 0%, 100%, 0.126) 73%, hsla(0, 0%, 100%, 0.075) 80.2%, hsla(0, 0%, 100%, 0.042) 86.1%, hsla(0, 0%, 100%, 0.021) 91%, hsla(0, 0%, 100%, 0.008) 95.2%, hsla(0, 0%, 100%, 0.002) 98.2%, hsla(0, 0%, 100%, 0) 100%)",
                  }}
                />
              </div> */}
              <main>{children}</main>
              <div className="pointer-events-none fixed bottom-0 left-0 z-50 h-32 w-full rotate-180">
                {/* Bottom gradient */}
                <div
                  className="block h-full dark:hidden"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #fff 0%, hsla(0, 0%, 100%, 0.738) 19%, hsla(0, 0%, 100%, 0.541) 34%, hsla(0, 0%, 100%, 0.382) 47%, hsla(0, 0%, 100%, 0.278) 56.5%, hsla(0, 0%, 100%, 0.194) 65%, hsla(0, 0%, 100%, 0.126) 73%, hsla(0, 0%, 100%, 0.075) 80.2%, hsla(0, 0%, 100%, 0.042) 86.1%, hsla(0, 0%, 100%, 0.021) 91%, hsla(0, 0%, 100%, 0.008) 95.2%, hsla(0, 0%, 100%, 0.002) 98.2%, hsla(0, 0%, 100%, 0) 100%)",
                  }}
                />
              </div>
            </main>
          </Theme.Provider>
        </ViewTransitions>
      </body>
    </html>
  );
}
