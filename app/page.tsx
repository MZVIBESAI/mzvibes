import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <Image
        src="/mz-logo.webp"
        alt="MZVIBES"
        width={220}
        height={145}
        priority
      />
<br/>
      <p className="text-zinc-400 text-center max-w-xl mb-10 text-xl">
  AI tools for DJs, music lovers and creators.
</p>

      <a
        href="/app/playlistai"
       className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
      >
        Launch Playlist AI 🎵
      </a>

    </main>
  );
}