export type ProductId = "stt" | "visual" | "capslock" | "autotyping";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type UseCase = {
  title: string;
  description: string;
};

export type Audience = {
  title: string;
  description: string;
};

export type Benefit = {
  title: string;
  description: string;
};

export type Product = {
  id: ProductId;
  selectorLabel: string;
  selectorDescription: string;
  eyebrow: string;
  headline: string;
  description: string;
  tags: string[];
  howItWorks: ProcessStep[];
  useCasesTitle: string;
  useCases: UseCase[];
  builtFor: Audience[];
  benefits: Benefit[];
};

export const PRODUCTS: Product[] = [
  {
    id: "stt",
    selectorLabel: "STT Intelligence",
    selectorDescription: "Voice to text, in real time",
    eyebrow: "STT INTELLIGENCE",
    headline: "Turn conversations into actionable intelligence.",
    description:
      "Capture spoken questions and conversations in real time and convert them into text for AI-powered understanding and response.",
    tags: [
      "Real-time transcription",
      "Speech understanding",
      "Voice questions",
      "Interview conversations",
    ],
    howItWorks: [
      {
        number: "01",
        title: "Listen",
        description: "Capture spoken questions and conversations.",
      },
      {
        number: "02",
        title: "Transcribe",
        description: "Convert speech into text in real time.",
      },
      {
        number: "03",
        title: "Understand",
        description: "Interpret the question and relevant context.",
      },
      {
        number: "04",
        title: "Respond",
        description: "Make the resulting intelligence available for the next action.",
      },
    ],
    useCasesTitle: "Where STT Intelligence Fits",
    useCases: [
      {
        title: "Interviews",
        description:
          "Capture and understand spoken interview questions in real time.",
      },
      {
        title: "Voice Q&A",
        description:
          "Ask questions verbally and receive AI-powered assistance.",
      },
      {
        title: "Verbal Assessments",
        description:
          "Support oral tests, assessments, and interview-style evaluations.",
      },
      {
        title: "Meetings & Discussions",
        description:
          "Capture spoken information and turn conversations into usable context.",
      },
    ],
    builtFor: [
      {
        title: "Students",
        description:
          "Prepare for interviews, exams, and competitive assessments.",
      },
      {
        title: "Job Seekers",
        description:
          "Practice interviews and handle spoken questions more effectively.",
      },
      {
        title: "Professionals",
        description:
          "Work with spoken information during technical and professional workflows.",
      },
      {
        title: "Organizations",
        description:
          "Support interviews, assessments, training, and conversation-based workflows.",
      },
    ],
    benefits: [
      {
        title: "Real-Time",
        description: "Move from speech to usable text quickly.",
      },
      {
        title: "Hands-Free",
        description:
          "Interact with AI without relying entirely on manual typing.",
      },
      {
        title: "Context-Aware",
        description: "Turn spoken information into useful AI context.",
      },
      {
        title: "Flexible",
        description:
          "Useful across interviews, assessments, and professional workflows.",
      },
    ],
  },
  {
    id: "visual",
    selectorLabel: "Visual Intelligence",
    selectorDescription: "Screen to intelligence, instantly",
    eyebrow: "VISUAL INTELLIGENCE",
    headline: "See what's on your screen.",
    description:
      "Capture questions, text, and visual information from your screen and turn them into structured AI-readable context.",
    tags: [
      "Screen understanding",
      "OCR",
      "Question capture",
      "Visual context",
    ],
    howItWorks: [
      {
        number: "01",
        title: "Capture",
        description: "Identify visible content on the active screen.",
      },
      {
        number: "02",
        title: "Scan",
        description: "Detect text and structured visual information.",
      },
      {
        number: "03",
        title: "Extract",
        description: "Convert screen content into readable context.",
      },
      {
        number: "04",
        title: "Understand",
        description: "Prepare the extracted question for AI assistance.",
      },
    ],
    useCasesTitle: "Where Visual Intelligence Fits",
    useCases: [
      {
        title: "MCQ Assessments",
        description: "Capture questions directly from the screen.",
      },
      {
        title: "Coding Questions",
        description: "Understand visible code and technical questions.",
      },
      {
        title: "Technical Assessments",
        description:
          "Extract structured information from assessment interfaces.",
      },
      {
        title: "Visual Questions",
        description:
          "Process questions or information presented visually.",
      },
    ],
    builtFor: [
      {
        title: "Students",
        description:
          "Work with on-screen questions during exams and practice.",
      },
      {
        title: "Job Seekers",
        description:
          "Handle visual assessment formats during hiring workflows.",
      },
      {
        title: "Professionals",
        description:
          "Extract context from technical interfaces and documents.",
      },
      {
        title: "Assessment Participants",
        description:
          "Engage with screen-based evaluations more effectively.",
      },
    ],
    benefits: [
      {
        title: "Instant Capture",
        description: "Turn on-screen content into usable context quickly.",
      },
      {
        title: "Structured",
        description: "Convert visual information into AI-readable form.",
      },
      {
        title: "Precise",
        description: "Focus on questions and relevant text on screen.",
      },
      {
        title: "Versatile",
        description:
          "Useful across MCQs, coding prompts, and visual assessments.",
      },
    ],
  },
  {
    id: "capslock",
    selectorLabel: "Caps Lock Intelligence",
    selectorDescription: "Instant AI assistance",
    eyebrow: "CAPS LOCK INTELLIGENCE",
    headline: "Instant AI assistance, right when you need it.",
    description:
      "Trigger AI intelligence through a simple keyboard interaction without interrupting your workflow.",
    tags: [
      "Instant activation",
      "Keyboard interaction",
      "Fast access",
      "Workflow-friendly",
    ],
    howItWorks: [
      {
        number: "01",
        title: "Activate",
        description: "Press Caps Lock to signal AI assistance.",
      },
      {
        number: "02",
        title: "Detect",
        description: "Recognize the request within your current context.",
      },
      {
        number: "03",
        title: "Engage",
        description: "Bring intelligence into the active workflow.",
      },
      {
        number: "04",
        title: "Ready",
        description: "Deliver assistance without leaving your focus.",
      },
    ],
    useCasesTitle: "Where Caps Lock Intelligence Fits",
    useCases: [
      {
        title: "Interviews",
        description:
          "Quickly activate AI assistance when a question appears.",
      },
      {
        title: "Assessments",
        description:
          "Access intelligence without constantly switching applications.",
      },
      {
        title: "Coding",
        description:
          "Trigger AI assistance during technical problem-solving workflows.",
      },
      {
        title: "Professional Workflows",
        description:
          "Use keyboard-driven AI interaction without breaking focus.",
      },
    ],
    builtFor: [
      {
        title: "Students",
        description:
          "Access assistance quickly during study and evaluation workflows.",
      },
      {
        title: "Job Seekers",
        description:
          "Stay focused while activating help during interviews.",
      },
      {
        title: "Professionals",
        description:
          "Keep momentum in technical and knowledge work sessions.",
      },
      {
        title: "Technical Users",
        description:
          "Prefer keyboard-first interaction for speed and control.",
      },
    ],
    benefits: [
      {
        title: "Instant",
        description: "Activate assistance with a single key interaction.",
      },
      {
        title: "Focused",
        description: "Stay in flow without switching contexts.",
      },
      {
        title: "Discreet",
        description: "Trigger intelligence through a familiar keyboard action.",
      },
      {
        title: "Reliable",
        description:
          "A consistent entry point across interviews and workflows.",
      },
    ],
  },
  {
    id: "autotyping",
    selectorLabel: "AI Auto Typing",
    selectorDescription: "From response to action",
    eyebrow: "AI AUTO TYPING",
    headline: "From AI response to your answer field.",
    description:
      "Move generated AI responses into supported input fields through controlled, automated text insertion.",
    tags: [
      "Controlled text insertion",
      "Automated typing",
      "Response streaming",
      "Keyboard workflow",
    ],
    howItWorks: [
      {
        number: "01",
        title: "Generate",
        description: "Receive an AI response ready for use.",
      },
      {
        number: "02",
        title: "Target",
        description: "Identify the supported input field.",
      },
      {
        number: "03",
        title: "Insert",
        description: "Type the response in a controlled sequence.",
      },
      {
        number: "04",
        title: "Refine",
        description: "Edit and finalize the inserted content as needed.",
      },
    ],
    useCasesTitle: "Where AI Auto Typing Fits",
    useCases: [
      {
        title: "Coding",
        description: "Move generated code into supported editors.",
      },
      {
        title: "Text-Based Assessments",
        description: "Insert responses into supported answer fields.",
      },
      {
        title: "Repetitive Input",
        description: "Reduce unnecessary manual typing.",
      },
      {
        title: "AI-Assisted Workflows",
        description:
          "Move from generated response to editable content faster.",
      },
    ],
    builtFor: [
      {
        title: "Students",
        description:
          "Transfer answers into supported fields during practice and tests.",
      },
      {
        title: "Job Seekers",
        description:
          "Move prepared responses into interview and assessment interfaces.",
      },
      {
        title: "Professionals",
        description:
          "Accelerate writing into tools and editors you already use.",
      },
      {
        title: "Technical Users",
        description:
          "Prefer controlled insertion over constant copy and paste.",
      },
    ],
    benefits: [
      {
        title: "Controlled",
        description: "Insert text with deliberate, paced automation.",
      },
      {
        title: "Efficient",
        description: "Reduce friction between response and input field.",
      },
      {
        title: "Editable",
        description: "Keep full control to refine after insertion.",
      },
      {
        title: "Integrated",
        description:
          "Fits naturally into keyboard-driven AI workflows.",
      },
    ],
  },
];

export const DEFAULT_PRODUCT_ID: ProductId = "stt";

export function getProduct(id: ProductId): Product {
  return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
}
