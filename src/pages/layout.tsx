import Head from "next/head";
import Footer from "../components/component.footer";
import Navbar from "../components/component.navbar";
import { Oswald } from "@next/font/google";
const oswald = Oswald();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={oswald.className}>
      <Head>
        <title>Create T3 App!</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="pt-10">{children}</main>
      <Footer />
    </div>
  );
}
