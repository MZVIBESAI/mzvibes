"use client";

import { useState } from "react";

export default function PlaylistAIPremium() {

  const [preview, setPreview] = useState<string | null>(null);

  const [imageBase64, setImageBase64] = useState("");

  const [loading, setLoading] = useState(false);

  const [tracks, setTracks] = useState<any[]>([
    {
      artist: "Drake",
      title: "One Dance",
      playlist: "Afro Dance",
      alsoFits: "Club",
      bpm: 104,
      energy: 7,
      mood: "Groovy",
      context: "Warm Up",
      color: "bg-orange-500/20 text-orange-300",
    },

    {
      artist: "Ed Sheeran",
      title: "Azizam",
      playlist: "Pop Mainstream",
      alsoFits: "Pop Summer",
      bpm: 122,
      energy: 6,
      mood: "Feel Good",
      context: "Open Format",
      color: "bg-purple-500/20 text-purple-300",
    },

    {
      artist: "Swedish House Mafia",
      title: "Miami 2 Ibiza",
      playlist: "EDM Festival",
      alsoFits: "House Club",
      bpm: 128,
      energy: 10,
      mood: "Euphoric",
      context: "Peak Time",
      color: "bg-cyan-500/20 text-cyan-300",
    },

    {
      artist: "The Weeknd",
      title: "Blinding Lights",
      playlist: "Pop Retro",
      alsoFits: "Dance Mainstream",
      bpm: 171,
      energy: 8,
      mood: "Energetic",
      context: "Prime Time",
      color: "bg-purple-500/20 text-purple-300",
    },
  ]);

  const handleImage = (file: File) => {

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    const reader = new FileReader();

    reader.onloadend = () => {

      setImageBase64(reader.result as string);

    };

    reader.readAsDataURL(file);

  };

  const analyzePlaylist = async () => {

    if (!imageBase64) return;

    setLoading(true);

    try {

      const response = await fetch("/api/analyse-premium", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          image: imageBase64,

        }),

      });

      const data = await response.json();

      if (data.tracks) {

        setTracks(data.tracks);

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };

  return (

    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-20">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Playlist AI Premium 🎧
          </h1>

          <p className="text-zinc-400 text-base md:text-lg">
            Upload full playlist screenshots and organize tracks instantly.
          </p>

        </div>

        <div className="max-w-2xl mx-auto mb-14">

          <label
            className="
              border-2 border-dashed border-zinc-700
              hover:border-zinc-500
              transition-all duration-300
              rounded-3xl
              p-10
              flex flex-col items-center justify-center
              cursor-pointer
              bg-zinc-950
              hover:bg-zinc-900/40
            "
          >

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {

                const file = e.target.files?.[0];

                if (file) handleImage(file);

              }}
            />

            {!preview ? (

              <>

                <p className="text-2xl mb-3">
                  🎧
                </p>

                <p className="text-white font-medium text-lg">
                  Upload Playlist Screenshot
                </p>

                <p className="text-zinc-500 text-sm mt-2">
                  Spotify • Apple Music • Rekordbox • Serato
                </p>

              </>

            ) : (

              <div className="w-full">

                <img
                  src={preview}
                  alt="preview"
                  className="rounded-2xl w-full max-h-[500px] object-cover"
                />

              </div>

            )}

          </label>

          <div className="flex justify-center mt-6">

            <button
              onClick={analyzePlaylist}
              disabled={loading}
              className="
                bg-white text-black
                px-8 py-3 rounded-full
                font-medium
                hover:scale-105
                transition-all duration-300
                disabled:opacity-50
              "
            >

              {loading ? "Analyzing..." : "Analyze Playlist"}

            </button>

          </div>

        </div>

        <div className="overflow-x-auto">

          <div className="min-w-[1200px] border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950 shadow-2xl">

            <div className="grid grid-cols-7 gap-4 px-6 py-5 border-b border-zinc-800 text-xs uppercase tracking-widest text-zinc-500 bg-zinc-900">

              <div>Artist</div>
              <div>Track</div>
              <div>Main Playlist</div>
              <div>Also Fits</div>
              <div>BPM</div>
              <div>Energy</div>
              <div>Mood / Context</div>

            </div>

            {tracks.map((track, index) => (

              <div
                key={index}
                className="grid grid-cols-7 gap-4 px-6 py-5 border-b border-zinc-900 hover:bg-zinc-900/50 transition-all duration-300"
              >

                <div className="font-medium text-white">
                  {track.artist}
                </div>

                <div className="text-zinc-300">
                  {track.title}
                </div>

                <div>

                  <span className={`${track.color} px-3 py-1 rounded-full text-sm`}>
                    {track.playlist}
                  </span>

                </div>

                <div>

                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm">
                    {track.alsoFits}
                  </span>

                </div>

                <div className="text-zinc-300 font-medium">
                  {track.bpm}
                </div>

                <div>

                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">

                    <div
                      className="bg-gradient-to-r from-red-500 via-red-400 to-transparent h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${track.energy * 10}%` }}
                    />

                  </div>

                  <p className="text-xs text-zinc-500 mt-1">
                    {track.energy}/10
                  </p>

                </div>

                <div>

                  <p className="text-white text-sm">
                    {track.mood}
                  </p>

                  <p className="text-zinc-500 text-xs mt-1">
                    {track.context}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );

}