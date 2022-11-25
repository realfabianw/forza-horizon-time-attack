import "./globals.css";
import Link from "next/link";
import React from "react";
import Header from "./header";

export default async function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Forza Horizon Timeattack</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <header>
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
