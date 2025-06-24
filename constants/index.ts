
 import { CreateAssistantDTO, CreateWorkflowDTO } from "@vapi-ai/web/dist/api";
 import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};


export const generator: CreateWorkflowDTO ={
  "name": "prepit-interviews",
  "nodes": [
    {
      "name": "Conversation",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -336.77078927778655,
          "y": -202.96520466344373
        }
      },
      "prompt": "Greet the user and Inform them that you will get some information from them, to create a perfect interview. Ask the caller for data required to extract. Ask the questions one by one, and await an answer.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 250,
        "temperature": 0.3
      },
      "variableExtractionPlan": {
        "output": [
          {
            "enum": [
              "entry",
              "mid",
              "senior"
            ],
            "type": "string",
            "title": "level",
            "description": " The job experience level. "
          },
          {
            "enum": [],
            "type": "number",
            "title": "amount",
            "description": " How many questions would you like me to prepare for you?"
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": " A list of technologies to cover during the job interview."
          },
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": "What role should would you like to train for?"
          },
          {
            "enum": [],
            "type": "string",
            "title": "type",
            "description": "Are you aiming for a technical, behavioral or mixed interview?"
          }
        ]
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "conversation_1750590675455",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -317.29125922486287,
          "y": 263.52159726473684
        }
      },
      "prompt": "Say that the interview will be generated shortly",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 250,
        "temperature": 0.3
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "API Request",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -309.599413578749,
          "y": 510.9953262998887
        }
      },
      "tool": {
          "url": `${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate`,
        "body": {
          "type": "object",
          "required": [
            "role",
            "level",
            "amount",
            "type",
            "userid",
            "techstack"
          ],
          "properties": {
            "role": {
              "type": "string",
              "value": "{{role}}",
              "description": ""
            },
            "type": {
              "type": "string",
              "value": "{{type}}",
              "description": ""
            },
            "level": {
              "type": "string",
              "value": "{{level}}",
              "description": ""
            },
            "amount": {
              "type": "number",
              "value": "{{amount}}",
              "description": ""
            },
            "userid": {
              "type": "string",
              "value": "{{userid}}",
              "description": ""
            },
            "techstack": {
              "type": "string",
              "value": "{{techstack}}",
              "description": ""
            }
          }
        },
        "name": "getUserData",
        "type": "apiRequest",
        "method": "POST",
        "function": {
          "name": "untitled_tool",
          "parameters": {
            "type": "object",
            "required": [],
            "properties": {}
          }
        },
        "messages": [
          {
            "type": "request-start",
            "content": "Please hold on. ",
            "blocking": true
          },
          {
            "role": "assistant",
            "type": "request-complete",
            "content": "The interview has been generate",
            "endCallAfterSpokenEnabled": true
          },
          {
            "type": "request-failed",
            "content": "Looks like something went wrong. Try again",
            "endCallAfterSpokenEnabled": true
          }
        ]
      }
    },
    {
      "name": "conversation_1750593440759",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -314.09506890538546,
          "y": 741.3339346977277
        }
      },
      "prompt": "Say the interview has been generated and thanks the user for the call.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 250,
        "temperature": 0.3
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "hangup_1750593533578",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -294.2655190561274,
          "y": 962.8271680707431
        }
      },
      "tool": {
        "type": "endCall"
      }
    }
  ],
  "edges": [
    {
      "from": "Conversation",
      "to": "conversation_1750590675455",
      "condition": {
        "type": "ai",
        "prompt": "If user provided all required variables"
      }
    },
    {
      "from": "conversation_1750590675455",
      "to": "API Request",
      "condition": {
        "type": "ai",
        "prompt": "Always"
      }
    },
    {
      "from": "API Request",
      "to": "conversation_1750593440759",
      "condition": {
        "type": "ai",
        "prompt": "On success"
      }
    },
    {
      "from": "conversation_1750593440759",
      "to": "hangup_1750593533578",
      "condition": {
        "type": "ai",
        "prompt": "Always"
      }
    }
  ],
  "globalPrompt": "You are a voice assistant helping with creating new AI interviewers. Your task is to collect data from the user. Remember that this is a voice conversation - do not use any special characters."
}





export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};


export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {    
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];
