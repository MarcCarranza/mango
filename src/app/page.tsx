// Components
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="header">
        <h1>Range Components - Mango</h1>
      </header>
      <main className="">
        <Link href="/exercise1">Exercise 1</Link>
        <Link href="/exercise2">Exercise 2</Link>
      </main>
    </>
  );
}
