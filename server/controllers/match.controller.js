import pdfParse from "pdf-parse";
import axios from "axios";

// Extract text from uploaded PDF buffer
export const resumeMatcher = async (req, res) => {
  try {
    const jobDescription = req.body.jd;
    if (!req.file || !jobDescription) {
      return res.status(400).json({ message: "Resume PDF and JD are required", success: false });
    }

    const pdfText = await pdfParse(req.file.buffer);
    const resumeText = pdfText.text;

    const systemPrompt = `
You are a recruitment AI. Given a resume and a job description, respond with:
1. A match percentage (0-100) labeled "match"
2. A list of keywords or phrases from the JD that are missing in the resume, labeled "suggestions"

Only return this JSON structure:
{
  "match": number,
  "suggestions": [array of strings]
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistral/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Resume:\n${resumeText}\n\nJD:\n${jobDescription}` },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // replace with your deployed domain
          "X-Title": "JobBridge-ResumeMatcher",
        },
      }
    );

    const aiOutput = JSON.parse(response.data.choices[0].message.content);

    return res.status(200).json({
      success: true,
      match: aiOutput.match,
      suggestions: aiOutput.suggestions,
    });
  } catch (error) {
    console.error("Error in resumeMatcher:", error?.response?.data || error.message);
    return res.status(500).json({ message: "Something went wrong", success: false });
  }
};
