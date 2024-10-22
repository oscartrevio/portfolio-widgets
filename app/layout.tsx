import "@/styles/main.css";

import type { Metadata } from "next";

// import * as Theme from "@/components/theme";
import { OpenGraph } from "@/lib/og";

import clsx from "clsx";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";
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
      path: "fonts/sf-pro-display/SF-Pro-Display-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "fonts/sf-pro-display/SF-Pro-Display-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/sf-pro-text-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/sf-pro-display/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(inter.className, sfPro.variable)}
      suppressHydrationWarning
    >
      <body>
        <ViewTransitions>
          {/* <Theme.Provider> */}
          <main className="mx-auto max-w-screen-xs overflow-x-hidden px-4 py-10 font-inter md:overflow-x-visible">
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
          {/* </Theme.Provider> */}
        </ViewTransitions>
      </body>
    </html>
  );
}
