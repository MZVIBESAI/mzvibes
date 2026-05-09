"use client";

import { useState } from "react";

export default function PlaylistAIPremium() {

  const [preview, setPreview] = useState<string | null>(null);

  const [imageBase64, setImageBase64] = useState("");

  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState("default");

  const [hasAnalyzed, setHasAnalyzed] = useState(false);

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

    setTracks([]);

    setHasAnalyzed(false);

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

  setHasAnalyzed(true);

}

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };

const playlistColors: Record<string, string> = {

  "Pop": "bg-pink-500/20 text-pink-300",

  "Pop Hits": "bg-pink-500/20 text-pink-300",

  "Pop Mainstream": "bg-purple-500/20 text-purple-300",

  "Pop Retro": "bg-purple-500/20 text-purple-300",

  "EDM Festival": "bg-cyan-500/20 text-cyan-300",

  "House Club": "bg-cyan-500/20 text-cyan-300",

  "Afro Dance": "bg-orange-500/20 text-orange-300",

  "RnB": "bg-violet-500/20 text-violet-300",

  "Hip-Hop": "bg-red-500/20 text-red-300",

  "Love Songs": "bg-rose-500/20 text-rose-300",

  "Acoustic": "bg-yellow-500/20 text-yellow-300",

  "Indie": "bg-emerald-500/20 text-emerald-300",

};

const sortedTracks = [...tracks].sort((a, b) => {

  if (sortBy === "bpm") {
    return b.bpm - a.bpm;
  }

  if (sortBy === "energy") {
    return b.energy - a.energy;
  }

  if (sortBy === "artist") {
    return a.artist.localeCompare(b.artist);
  }

  if (sortBy === "playlist") {
    return a.playlist.localeCompare(b.playlist);
  }

  return 0;

});

const exportCSV = () => {

  const headers = [
    "Artist",
    "Track",
    "Main Playlist",
    "Also Fits",
    "BPM",
    "Energy",
    "Mood",
    "Context",
  ];

  const rows = tracks.map((track) => [

    track.artist,
    track.title,
    track.playlist,
    track.alsoFits,
    track.bpm,
    track.energy,
    track.mood,
    track.context,

  ]);

  const csvContent = [

    headers.join(","),

    ...rows.map((row) => row.join(","))

  ].join("\n");

  const blob = new Blob([csvContent], {

    type: "text/csv;charset=utf-8;",

  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "playlist-analysis.csv";

  link.click();

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
  onDragOver={(e) => {
    e.preventDefault();
  }}

  onDrop={(e) => {

    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleImage(file);
    }

  }}

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

 {hasAnalyzed ? (

  <div className="text-center">

    <p className="text-white text-lg font-medium">
      Analyze another playlist
    </p>

    <p className="text-zinc-500 text-sm mt-2">
      Drag & drop or click to upload a new screenshot
    </p>

  </div>

) : !preview ? (

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

        {!hasAnalyzed && (

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

)}

        </div>
<div className="flex justify-end items-center gap-3 mb-4">

    <button
  onClick={exportCSV}
  className="
    bg-zinc-900
    border border-zinc-800
    text-zinc-300
    rounded-xl
    px-4 py-2
    text-sm
    hover:bg-zinc-800
    transition-all duration-300
  "
>

  Export CSV

</button>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="
      bg-zinc-900
      border border-zinc-800
      text-zinc-300
      rounded-xl
      px-4 py-2
      text-sm
      outline-none
    "
  >

    <option value="default">Default</option>
    <option value="bpm">BPM</option>
    <option value="energy">Energy</option>
    <option value="artist">Artist</option>
    <option value="playlist">Playlist</option>

  </select>

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

{sortedTracks.map((track, index) => (

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

<span
  className={`
    ${playlistColors[track.playlist] || "bg-zinc-700 text-zinc-200"}
    px-3 py-1 rounded-full text-sm
  `}
>
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

        <p className="text-zinc-500 text-sm text-center mt-6 leading-relaxed max-w-3xl mx-auto">
  There is no strict limit to the number of tracks that can be analyzed from a single screenshot.
  However, analysis accuracy depends on the screenshot quality, text visibility, and spacing between tracks.
  For the most accurate and consistent results, screenshots containing up to 30 tracks are recommended.
</p>

      </div>

    </main>

  );

}