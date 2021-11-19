import Head from "next/head";
import AppBarWithMenu from "../components/AppBarWithMenu";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppBarWithMenu />
    </>
  );
}
