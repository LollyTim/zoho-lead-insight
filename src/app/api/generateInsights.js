import axios from "axios";

export default async function handler(req, res) {
  const { leads } = req.body;

  try {
    const promptData = leads
      .map(
        (lead) => `
      Lead Name: ${lead.fullName}
      Company: ${lead.company}
      Email: ${lead.email}
      Status: ${lead.status}
      Industry: ${lead.industry}
      Potential Revenue: ${lead.potentialRevenue}
      Source: ${lead.source}
      Phone: ${lead.phone}
      Location: ${lead.city}, ${lead.country}
      Engagement Score: ${lead.engagementScore}
    `
      )
      .join("\n\n");

    const aiResponse = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Generate detailed insights based on the following lead data:\n\n${promptData}`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json({ insights: [aiResponse.data.choices[0].text] });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    res.status(500).json({ error: "Failed to generate insights" });
  }
}
