"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { playlistCategories } from "@/data/playlistDatabase";

export default function Home() {

  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [songInput, setSongInput] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {

    const file = acceptedFiles[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);

    }

  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const analyzeImage = async () => {

    if (!image && !songInput) return;

    setLoading(true);
    setResult(null);

    try {

      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          songInput,
        }),
      });

      const data = await response.json();

      setResult(data);

    } catch (error) {

      setResult({
        error: "Error analyzing screenshot.",
      });

    }

    setLoading(false);

  };

  const mainPlaylist = result?.mainPlaylist;
  const alsoFits = result?.secondaryPlaylist;
  const bpm = result?.bpm;
  const energy = result?.energy;
  const mood = result?.mood;
  const context = result?.context;
  const title = result?.title;
  const artist = result?.artist;
  const insights = result?.insights;

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-5xl font-bold mb-4">
        Playlist AI 🎵
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-md">
        Upload a music screenshot or enter an artist + song title to instantly find the perfect playlist category.
      </p>

      <input
        type="text"
        placeholder="Artist + song title..."
        value={songInput}
        onChange={(e) => setSongInput(e.target.value)}
        className="w-full max-w-xl mb-6 px-5 py-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition"
      />

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-600 rounded-2xl p-10 text-center w-full max-w-xl hover:border-white transition cursor-pointer"
      >

        <input {...getInputProps()} />

        {!image ? (

          <>
            <p className="text-lg mb-2">
              Upload Music Screenshot
            </p>

            <p className="text-sm text-gray-500">
              1 artist • 1 song title
              <br />
              Spotify • Apple Music • YouTube Music
            </p>
          </>

        ) : (

          <img
            src={image}
            alt="preview"
            className="rounded-xl max-h-[500px] mx-auto"
          />

        )}

      </div>

      <button
        onClick={analyzeImage}
        className="mt-8 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
      >

        {loading ? "Analyzing..." : "Analyze"}

      </button>

      {result && !result.error && (

        <div className="mt-10 max-w-xl w-full space-y-6">

          <div className="text-center mb-2 animate-fadeIn">

            <p className="uppercase tracking-[0.25em] text-xs text-zinc-500 mb-4">
              Perfect playlist found for
            </p>

{songInput &&
  title &&
  artist &&
  !songInput
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .includes(
      `${title} ${artist}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
    ) && (

    <div className="mb-4">

      <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-600 mb-2">
        Corrected track match
      </p>

      <p className="text-sm text-zinc-400">
        <span className="text-white font-medium">
          {title} — {artist}
        </span>
      </p>

    </div>

)}

            <h2 className="text-4xl font-bold text-white leading-tight">
              {title}
            </h2>

            {artist && (
              <>
                <p className="text-xl text-zinc-400 mt-2">
                  — {artist}
                </p>

                {result?.artistInfo && (
                  <p className="text-sm text-zinc-500 mt-4 max-w-md mx-auto leading-7">
                    {result.artistInfo}
                  </p>
                )}
              </>
            )}

          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 text-center shadow-2xl">

            <div className="space-y-6">

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">

                <p className="text-sm uppercase tracking-widest text-purple-300 mb-2">
                  Main Playlist
                </p>

                <h2 className="text-4xl font-bold text-white">
                  {mainPlaylist}
                </h2>

              </div>

              {alsoFits && (

                <div className="bg-zinc-800/80 border border-zinc-700 rounded-2xl p-5">

                  <p className="text-sm uppercase tracking-widest text-zinc-400 mb-2">
                    Also Fits
                  </p>

                  <h3 className="text-2xl font-semibold text-white">
                    {alsoFits}
                  </h3>

                </div>

              )}

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                  <p className="text-blue-300 text-sm mb-1">
                    BPM
                  </p>

                  <p className="text-3xl font-bold text-white">
                    {bpm}
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                  <p className="text-red-300 text-sm mb-1">
                    Energy
                  </p>

                  <p className="text-3xl font-bold text-white">
                    {energy}
                  </p>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4">
                  <p className="text-violet-300 text-sm mb-1">
                    Mood
                  </p>

                  <p className="text-xl font-semibold text-white">
                    {mood}
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                  <p className="text-green-300 text-sm mb-1">
                    Context
                  </p>

                  <p className="text-xl font-semibold text-white">
                    {context}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {insights && insights.length > 0 && (

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 backdrop-blur-sm">

              <h3 className="text-sm uppercase tracking-[0.25em] text-zinc-500 mb-5 text-center">
                AI Match Insights
              </h3>

              <div className="space-y-3">

                {insights.map((insight: string, index: number) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 text-zinc-300"
                  >

                    <div className="w-2 h-2 rounded-full bg-purple-400" />

                    <p className="text-sm leading-6">
                      {insight}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      )}

      <div className="mt-24 max-w-5xl w-full space-y-16">

        <div className="text-center space-y-6">

          <h2 className="text-4xl font-bold">
            Why This Playlist System Works
          </h2>

          <p className="text-zinc-400 text-lg leading-8 max-w-3xl mx-auto">
            Most people organize music randomly.
            Professional DJs don’t.

            <br />
            <br />

            Our AI uses a structured playlist classification system inspired by real DJ workflows used in clubs, radio, festivals and private events.

            <br />
            <br />

            Every track is analyzed and matched into consistent playlist categories so songs are always easy to find, mix and organize.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-4">
              Mood Based
            </h3>

            <p className="text-zinc-400 leading-7">
              Tracks are grouped by emotional feeling and listening vibe:
              Chill, Euphoric, Emotional, Romantic, Dark, Motivational…
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-4">
              DJ Optimized
            </h3>

            <p className="text-zinc-400 leading-7">
              Playlist names are inspired by real DJ organization systems used to quickly prepare club sets, lounge sessions, weddings and festival performances.
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-4">
              Universal Logic
            </h3>

            <p className="text-zinc-400 leading-7">
              The same music style will always return the same playlist categories, creating a universal and easy-to-understand organization method.
            </p>

          </div>

        </div>

      </div>

      <div className="mt-28 max-w-6xl w-full">

  <div className="text-center mb-12">

    <h2 className="text-4xl font-bold mb-4">
      Explore Playlist Categories
    </h2>

    <p className="text-zinc-500 max-w-2xl mx-auto leading-7">
      Every playlist category used by the AI is designed to organize music by energy, mood, atmosphere and real DJ workflow logic.
    </p>

  </div>

 <div className="space-y-14">

  {playlistCategories.map((category, categoryIndex) => (

    <div key={categoryIndex}>

      <div className="flex items-center gap-4 mb-6">

        <div className="h-px bg-zinc-800 flex-1" />

        <h3 className="text-sm tracking-[0.35em] text-zinc-500 uppercase">
          {category.title}
        </h3>

        <div className="h-px bg-zinc-800 flex-1" />

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {category.playlists.map((playlist: string, index: number) => (

          <div
            key={index}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl px-5 py-4 text-center hover:border-purple-500/40 hover:bg-zinc-900 transition duration-300 group"
          >

            <p className="text-zinc-300 font-medium group-hover:text-white transition">
              {playlist}
            </p>

          </div>

        ))}

      </div>

    </div>

  ))}

</div>

</div>

    </main>

  );

}