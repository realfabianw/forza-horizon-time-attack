import "./globals.css";
import React from "react";
import Header from "./header";
import Head from "next/head"; // causes error. Why?

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Forza Horizon Timeattack</title>
        <meta name="description" content="FH5 Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-b from-slate-800 to-indigo-300">
        <header>
          <Header />
        </header>
        <main className="flex min-h-screen justify-center ">{children}</main>
      </body>
    </html>
  );
}
