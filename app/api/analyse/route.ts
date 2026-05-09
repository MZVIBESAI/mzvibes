import OpenAI from "openai";
import { playlists } from "@/data/playlistDatabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const image = body.image;
    const songInput = body.songInput;

    const prompt = `
Analyze this music ${image ? "screenshot" : "song"}.

${songInput ? `Song info: ${songInput}` : ""}

You MUST identify:
- song title
- artist name

You MUST choose ONLY from this official playlist database:

${playlists.join(", ")}

Rules:
- Choose 1 main playlist only
- Optional: choose 1 secondary playlist
- Never invent playlist names
- BPM must be realistic
- Energy must be from 1 to 10
- Mood must stay short
- Context must stay short
- Add 1 concise interesting sentence about the artist or song
- Keep it under 20 words
- Add 3 short AI match insights
- Each insight must stay under 8 words
- Insights must explain WHY the playlist matches
- Always prioritize the PRIMARY mainstream genre identity
- The same song must always return the same main playlist
- Do not randomly alternate between Pop, R&B, Rap or Dance
- Choose the MOST dominant musical identity
- Prioritize consistency over creativity
- Always prioritize broad mainstream playlists before niche playlists
- Emotional playlists must ONLY be used for clearly emotional or slow songs
- Pop Mainstream should be prioritized for most modern commercial pop songs
- Pop Ballads should ONLY be used for slow emotional ballads
- Dance playlists should ONLY be used if dance energy is dominant
- Do not classify songs based on artwork, colors or screenshot aesthetics
- Focus on the actual music identity and listener expectation
- Correct obvious spelling mistakes in song titles and artist names
- Return the REAL official song title if the intended song is obvious
- Never keep incorrect spellings
- Prioritize known official commercial song titles
- Never invent unknown songs or artists
- If uncertain, prioritize the most famous official match
- Prioritize listener expectation over niche genre interpretation
- If the intended song is obvious, return the official commercial title
- Example: "Aziza Ed Sheeran" should return "Azizam — Ed Sheeran"
- Minor misspellings must be corrected to the closest famous official song title

Return ONLY valid JSON.

Example:

{
  "title": "DEADLIN",
  "artist": "Blackpink",
  "correctedTitle": "DEADLINE",
  "correctedArtist": "Blackpink",
  "mainPlaylist": "K-Pop Energy",
  "secondaryPlaylist": "Dance Mainstream",
  "bpm": "128",
  "energy": "9/10",
  "mood": "Powerful",
  "context": "Festival Peak Time",
  "artistInfo": "BLACKPINK mixes K-pop, hip-hop and EDM influences into stadium-sized pop productions."
"insights": [
    "Emotional stadium atmosphere",
    "Strong nostalgic energy",
    "Perfect dramatic transitions"
  ]
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,

      messages: [
        {
          role: "user",
          content: image
            ? [
                {
                  type: "text",
                  text: prompt,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: image,
                  },
                },
              ]
            : prompt,
        },
      ],

      response_format: {
        type: "json_object",
      },

    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    const parsed = JSON.parse(content);

    return Response.json(parsed);

  } catch (error) {

    console.error("OPENAI ERROR:", error);

    return Response.json({
      error: "AI analysis failed",
    });

  }

}