import ScrollVideo from "./components/ScrollVideo";

export default function Home() {
  return (
    <main className="bg-black">
      <ScrollVideo />

      <section className="flex h-screen items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold">
          Tamil Heritage
        </h1>
      </section>
    </main>
  );
}