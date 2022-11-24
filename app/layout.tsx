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
    <div>
      <body>
        <main>
          <nav>
            {/* <Link href="/">Home</Link>
            <Link href="/tracks">Racetracks</Link> */}
            <Header />
          </nav>
          {children}
        </main>
      </body>
    </div>
  );
}
