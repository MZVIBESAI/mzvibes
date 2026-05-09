import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const image = body.image;

    const response = await openai.responses.create({

      model: "gpt-4o",

      input: [

        {
          role: "user",

          content: [

            {
              type: "input_text",

              text: `
Analyze this playlist screenshot.

Extract ALL visible tracks.

Return ONLY a valid JSON array.

Format:

[
  {
    "artist": "",
    "title": "",
    "playlist": "",
    "alsoFits": "",
    "bpm": 120,
    "energy": 7,
    "mood": "",
    "context": ""
  }
]

Rules:
You MUST choose ONLY from these playlist names:

- Afro Dance
- Pop Mainstream
- Pop Retro
- EDM Festival
- House Club
- Love Songs
- Hip-Hop
- RnB
- Acoustic
- Indie
- Pop Hits

Do NOT invent new playlist names.

- BPM must be realistic
- Energy must be from 1 to 10
- Keep mood short
- Keep context short
- No markdown
- No explanations
- JSON only
`,
            },

            {
              type: "input_image",
              image_url: image,
            },

          ],
        },

      ],

    });

    const text = response.output_text;

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedTracks = JSON.parse(cleanedText);

    return Response.json({
      tracks: parsedTracks,
    });

  } catch (error) {

    console.error("Premium analysis error:", error);

    return Response.json(
      {
        error: "Analysis failed",
      },
      {
        status: 500,
      }
    );

  }

}