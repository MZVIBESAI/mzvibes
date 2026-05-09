export const playlistCategories = [

  {
    title: "POP",
    playlists: [
      "Pop Mainstream",
      "Pop Dance",
      "Pop Divas",
      "Summer Pop",
      "Pop Throwback",
      "Pop Ballads",
      "Pop Party",
    ],
  },

  {
    title: "R&B",
    playlists: [
      "R&B Classics",
      "Modern R&B",
      "R&B Chill",
      "Slow Jams",
      "R&B Divas",
      "Neo Soul",
      "R&B Grooves",
    ],
  },

  {
    title: "RAP",
    playlists: [
      "Hip-Hop Classics",
      "Trap",
      "Melodic Rap",
      "Drill",
      "Female Rap",
      "Rap Vibes",
      "Motivation Rap",
      "Rap Party",
    ],
  },

  {
    title: "LATINO",
    playlists: [
      "Reggaeton",
      "Latin Dance",
      "Latin Chill",
      "Latin Romance",
      "Latin Party",
      "Bachata",
    ],
  },

  {
    title: "ELECTRONIC",
    playlists: [
      "House Club",
      "House Chill",
      "Tech House",
      "Deep House",
      "Festival EDM",
      "Dance Hits",
    ],
  },

  {
    title: "AFRO",
    playlists: [
      "Afrobeats",
      "Afro Chill",
      "Afro Party",
    ],
  },

  {
    title: "ROCK",
    playlists: [
      "Rock Classics",
      "Alternative Rock",
      "Pop Rock",
    ],
  },

  {
    title: "CHILL",
    playlists: [
      "Lounge Chill",
      "Coffeehouse",
      "Study Session",
      "Night Drive",
    ],
  },

  {
    title: "PARTY",
    playlists: [
      "Club Hits",
      "Birthday Party",
      "Wedding Anthems",
    ],
  },

  {
    title: "FITNESS",
    playlists: [
      "Gym Motivation",
      "Cardio Boost",
    ],
  },

  {
    title: "EMOTIONAL",
    playlists: [
      "Sad Songs",
      "Heartbreak",
      "Love Songs",
    ],
  },

];

export const playlists =
  playlistCategories.flatMap((category) => category.playlists);