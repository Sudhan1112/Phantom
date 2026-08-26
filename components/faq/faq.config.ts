export type FaqCategoryId =
  | "product"
  | "features"
  | "ai"
  | "pricing"
  | "privacy";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
  items: FaqItem[];
};

export const FAQ_COPY = {
  eyebrow: "FAQ",
  headline: "Questions, Answered",
  support: "Everything you need to know before you start.",
} as const;

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "product",
    label: "Product",
    items: [
      {
        id: "what-is",
        question: "What is the platform?",
        answer:
          "It's a native AI intelligence layer for interviews, assessments, competitive exams, and career workflows. Instead of starting from a blank prompt, it helps turn voice, screen, and keyboard context into usable intelligence.",
      },
      {
        id: "use-for",
        question: "What can I use it for?",
        answer:
          "You can use it across spoken questions, on-screen assessments, coding challenges, interview practice, and other workflows where AI assistance needs real situational context.",
      },
      {
        id: "os-support",
        question: "Which operating systems are supported?",
        answer:
          "The platform is designed as a native desktop experience for Windows and macOS. Availability for each release will be shown on the download page.",
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    items: [
      {
        id: "stt",
        question: "How does STT work?",
        answer:
          "STT Intelligence captures spoken questions and conversations in real time, converts them into text, and makes that context available for AI-powered understanding and response.",
      },
      {
        id: "ocr",
        question: "How does OCR work?",
        answer:
          "Visual Intelligence captures questions, text, and other information from your screen and turns it into structured AI-readable context so the platform can understand what you're looking at.",
      },
      {
        id: "capslock",
        question: "What does Caps Lock Intelligence do?",
        answer:
          "Caps Lock Intelligence lets you trigger AI assistance through a simple keyboard interaction, so you can request help without leaving your current workflow.",
      },
      {
        id: "autotyping",
        question: "How does Auto Typing work?",
        answer:
          "AI Auto Typing moves generated responses into supported input fields through controlled, automated text insertion — so you can go from intelligence to action faster.",
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    items: [
      {
        id: "models",
        question: "Which AI models are supported?",
        answer:
          "The platform is designed to work with multiple supported AI providers and models. Available options can vary by operation, and you can explore estimated costs for supported models in the pricing calculator.",
      },
      {
        id: "routing",
        question: "How does model routing work?",
        answer:
          "Model routing selects an appropriate supported processing path based on the task and available models. The goal is efficient intelligence — not forcing every request through a single model.",
      },
      {
        id: "context",
        question: "How is context handled?",
        answer:
          "Context comes from the active workflow: spoken input, on-screen information, and interaction signals. The platform uses that context to understand the moment before generating a response.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      {
        id: "credits",
        question: "How do credits work?",
        answer:
          "The platform uses a pay-as-you-go credit model. You consume credits based on the type and amount of AI processing you perform across supported operations.",
      },
      {
        id: "usage-calc",
        question: "How is usage calculated?",
        answer:
          "Usage is estimated from the selected operation, model, and volume — such as tokens, audio minutes, or images. The calculator converts provider cost into an estimated customer price and credit amount.",
      },
      {
        id: "expire",
        question: "Does unused credit expire?",
        answer:
          "Credit expiration policy will be confirmed before production launch. Until then, treat calculator credit values as estimates for planning, not final account rules.",
      },
      {
        id: "estimate",
        question: "Can I estimate my usage before purchasing?",
        answer:
          "Yes. Use the Pricing calculator to configure LLM, STT, OCR, or combined workflows and see an estimated customer price and credit requirement before you spend.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    items: [
      {
        id: "processes",
        question: "What information does the application process?",
        answer:
          "Depending on the capability you use, the application may process spoken audio, on-screen text or images, and keyboard-driven interaction signals needed to provide assistance.",
      },
      {
        id: "handled",
        question: "How is my data handled?",
        answer:
          "Data handling is designed around supporting the active workflow with appropriate privacy controls. Detailed retention, encryption, and processing policies will be published with the production release.",
      },
      {
        id: "stored",
        question: "Is my information stored?",
        answer:
          "Storage practices depend on the feature and account settings. The platform is being designed to minimize unnecessary retention and keep users in control of how assistance is used.",
      },
    ],
  },
];
