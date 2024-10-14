import "@/styles/main.css";

import type { Metadata } from "next";

import * as Theme from "@/components/theme";
import { OpenGraph } from "@/lib/og";

import clsx from "clsx";
import { ViewTransitions } from "next-view-transitions";
import { EB_Garamond, Inter, Newsreader } from "next/font/google";

export const metadata: Metadata = {
  ...OpenGraph,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
      className={clsx(inter.className, newsreader.variable)}
      suppressHydrationWarning
    >
      <body>
        <ViewTransitions>
          <Theme.Provider>
            <main className="mx-auto max-w-screen-sm overflow-x-hidden px-6 py-24 md:overflow-x-visible">
              <div className="pointer-events-none fixed left-0 top-0 z-50 h-32 w-full">
                {/* Top gradient */}
                <div
                  className="block dark:hidden h-full pointer-events-none user-select-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #fff 0%, hsla(0, 0%, 100%, 0.738) 19%, hsla(0, 0%, 100%, 0.541) 34%, hsla(0, 0%, 100%, 0.382) 47%, hsla(0, 0%, 100%, 0.278) 56.5%, hsla(0, 0%, 100%, 0.194) 65%, hsla(0, 0%, 100%, 0.126) 73%, hsla(0, 0%, 100%, 0.075) 80.2%, hsla(0, 0%, 100%, 0.042) 86.1%, hsla(0, 0%, 100%, 0.021) 91%, hsla(0, 0%, 100%, 0.008) 95.2%, hsla(0, 0%, 100%, 0.002) 98.2%, hsla(0, 0%, 100%, 0) 100%)",
                  }}
                />
              </div>
              <article className="article">{children}</article>
              <div className="pointer-events-none fixed left-0 bottom-0 z-50 h-32 w-full rotate-180">
                {/* Bottom gradient */}
                <div
                  className="block dark:hidden h-full"
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
