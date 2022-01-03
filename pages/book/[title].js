import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import AppBarWithMenu from "../../components/AppBarWithMenu";

export default function Book() {
  const [session] = useSession();
  const router = useRouter();

  const { title } = router.query;

  return (
    <>
      <Head>
        <title>介紹頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppBarWithMenu session={session} />
      {title}介紹
    </>
  );
}
