import Head from "next/head";
import Footer from "../components/component.footer";
import Navbar from "../components/component.navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-svg flex flex-col bg-zinc-900"
      // style={{ backgroundImage: "/background.svg" }}
    >
      <Head>
        <title>Forza Horizon Time Attack</title>
        <meta
          name="description"
          content="Forza Horizon Time Attack is an online leaderboard for all tracks in Forza Horizon 5. Share your best times with the community."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="min-h-screen pt-10">{children}</main>
      <Footer />
    </div>
  );
}
