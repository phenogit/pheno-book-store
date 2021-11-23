import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import AppBarWithMenu from "../components/AppBarWithMenu";

export default function IndexPage() {
  const [session] = useSession();

  //session = "something";

  return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppBarWithMenu />

      {!session && (
        <>
          <span>未登入</span>
          <button onClick={() => signIn()}>登入</button>
        </>
      )}

      {session && (
        <>
          <span>已登入</span>
        </>
      )}
    </>
  );
}
