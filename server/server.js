import express from "express"
import cors from "cors"
import fs from "fs/promises"
import path from "path"
import { GoogleGenerativeAI } from "@google/generative-ai"

const app = express();
const port = 3223;

app.use(cors());

const apiKey = 'AIzaSyASngCWF8WNM5SEavXNQNTaR7RVzvfV8Y0';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
 model: "gemini-1.5-flash-exp-0827",
});

const systemPrompt = `
You are an AI assistant tasked with analyzing candidate and expert resumes for job matching. 
Your response should always be in the following JSON format:
{
  "candidateId": "string",
  "candidateName": "string",
  "experts": [
    {
      "expertId": "string",
      "expertName": "string",
      "relevancyScore": number
    }
  ]
}
Calculate the relevancyScore (0-100) based on how well the expert's skills match the candidate's needs.
Sort the experts array by relevancyScore in descending order.
`;

async function loadDemoData() {
    const demoDataPath = path.join('../defend_x/defend_x_frontend/src/components/demo.json');
    const data = await fs.readFile(demoDataPath, 'utf8');
    return JSON.parse(data);
  }
  
async function getRelevancyScores(candidate, experts) {
  const prompt = `
${systemPrompt}
Candidate: ${JSON.stringify(candidate)}
Experts: ${JSON.stringify(experts)}
Analyze the candidate's resume and compare it with each expert's resume. 
Provide relevancy scores and sort the experts based on their ability to interview this candidate.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();
  

  try {
    return JSON.parse(responseText);
  } catch (error) {
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    } else {
      console.log("Failed to extract JSON. Full response:", responseText);
      throw new Error("Failed to parse JSON from the response");
    }
  }
}

app.get('/start', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  try {
      const demoData = await loadDemoData();
      const totalCandidates = demoData.candidates.length;
        console.log(demoData)
    for (let i = 0; i < demoData.candidates.length; i++) {
      const candidate = demoData.candidates[i];
      try {
        const result = await getRelevancyScores(candidate, demoData.experts);
        const progress = Math.round(((i + 1) / totalCandidates) * 100);
        res.write(`data: ${JSON.stringify({ progress, result })}\n\n`);
      } catch (error) {
        console.error(`Error processing candidate ${candidate.id}:`, error);
        res.write(`event: error\ndata: ${JSON.stringify({ error: `Error processing candidate ${candidate.id}: ${error.message}` })}\n\n`);
      }
    }

    res.write('event: end\ndata: Processing complete\n\n');
  } catch (error) {
    console.error('Error:', error);
    res.write(`event: error\ndata: ${JSON.stringify({ error: `An error occurred while processing the request: ${error.message}` })}\n\n`);
  } finally {
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
