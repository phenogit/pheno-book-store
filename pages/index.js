import Head from "next/head";
import { useSession } from "next-auth/client";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

import AppBarWithMenu from "../components/AppBarWithMenu";

export async function getStaticProps() {
  const booksDirectory = path.join(process.cwd(), "Books");
  const bookTitles = await fs.readdir(booksDirectory);

  let books = [];

  for (const title of bookTitles) {
    const bookDirectory = path.join(booksDirectory, title);
    const chapters = await fs.readdir(bookDirectory);
    books.push({
      title,
      chapters,
    });
  }

  return {
    props: {
      books,
    },
  };
}

export default function IndexPage({ books }) {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppBarWithMenu session={session} />

      {books.map((book) => (
        <div key={book.title}>
          <Link href="/book/[title]" as={`/book/${book.title}`}>
            <a>{book.title}</a>
          </Link>
        </div>
      ))}
    </>
  );
}
