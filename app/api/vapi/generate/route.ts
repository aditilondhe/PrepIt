import { generateText } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  console.log("Incoming Interview Request:", { type, role, level, techstack, amount, userid });

  try {
    const provider = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
    });

    const { text: questions } = await generateText({
      provider,
      model: google("gemini-2.0-flash"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Return only a JSON array of questions like ["Question 1", "Question 2"].`,
    });

    console.log("Raw questions from Gemini:", questions);

    let parsedQuestions: string[] = [];
    try {
      parsedQuestions = JSON.parse(questions);
      if (!Array.isArray(parsedQuestions)) throw new Error("Not an array");
    } catch (e) {
      parsedQuestions = questions
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q.length > 0 && !q.toLowerCase().includes("question"))
        .slice(0, amount);
    }

    console.log("Parsed questions array:", parsedQuestions);

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toString(),
    };

    const docRef = await db.collection("interviews").add(interview);

    return Response.json({ success: true, interview: { id: docRef.id, ...interview } }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Interview Generation Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: 'THANK YOU' }, { status: 200 });
}
