export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-6xl font-bold mb-6">
        MZVIBES
      </h1>

      <p className="text-zinc-400 text-center max-w-xl mb-10 text-lg">
        AI tools for DJs, music lovers and creators.
      </p>

      <a
        href="/app/playlistai"
        className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
      >
        Launch Playlist AI 🎵
      </a>

    </main>
  );
}