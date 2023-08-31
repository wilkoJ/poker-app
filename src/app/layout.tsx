import React from "react";
import "./globals.css";
import ReduxProvider from "store/provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
