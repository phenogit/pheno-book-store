import Head from "next/head";

import Button from "@mui/material/Button";

function IndexPage() {
  return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Button variant="contained">Hello World</Button>;
    </>
  );
}

export default IndexPage;
