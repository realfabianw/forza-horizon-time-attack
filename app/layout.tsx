import "./globals.css";
import Link from "next/link";
import React from "react";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <body>
        <main>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/tracks">Racetracks</Link>
          </nav>
          {children}
        </main>
      </body>
    </div>
  );
}
