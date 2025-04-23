import type { Metadata } from "next";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'; // Import Remix Icon CSS
import NextAuthSessionProvider from "./sessionWrapper";
import { ToastContainer } from 'react-toastify'; // Initialize ToastContainer for App
import { ThemeProvider } from "./context/ThemeContext";
import StickyButton from "./components/language&theme/Button";

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
        {/* This script runs before anything else loads */}
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
        <NextAuthSessionProvider>
          <ThemeProvider>
            <ToastContainer />
            {children}
            <StickyButton />
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
