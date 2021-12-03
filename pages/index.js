import Head from "next/head";
import { useSession } from "next-auth/client";
import AppBarWithMenu from "../components/AppBarWithMenu";

export default function IndexPage() {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppBarWithMenu session={session} />

      <ul>
        <li>Book 1</li>
        <li>Book 2</li>
      </ul>
    </>
  );
}
