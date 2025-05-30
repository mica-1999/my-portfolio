/**
 * Global layout for the application.
 * 
 * It imports global.css for styling and remixicon for icons.
 * It wraps the application in a NextAuthSessionProvider and ThemeProvider.
 * It also includes a ToastContainer for notifications and a StickyButton for theme toggling.
 * 
 */
// REVIEWED: 2025-05-05 - Good to go ✅


import type { Metadata } from "next";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import NextAuthSessionProvider from "./sessionWrapper";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "./context/ThemeContext";
import StickyButton from "./components/themebtn/Button";
import LoadingWrapper from "./components/reusable/LoadingWrapper";

export const metadata: Metadata = {
  title: "Micael's Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'Dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'Light' || !theme) {
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'Auto') {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {/* NextAuthSessionProvider must be the outermost provider */}
        <NextAuthSessionProvider>
          <ThemeProvider>
            <LoadingWrapper>
              <ToastContainer />
              {children}
              <StickyButton />
            </LoadingWrapper>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
