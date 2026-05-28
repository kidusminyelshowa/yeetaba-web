export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  sector: string;
  focus: string[];
  image: string;
  overview: string;
  highlights: string[];
  deliverables: string[];
}

export const projects: Project[] = [
  {
    slug: "elida",
    title: "ELiDA",
    subtitle: "Empathy for Life Integrated Development Association",
    sector: "Advocacy & Public Engagement",
    focus: ["Advocacy", "Branding", "Storytelling", "Gender Justice"],
    image: "https://images.unsplash.com/photo-1558403135-c144dd559b39?auto=format&fit=crop&q=80&w=1200",
    overview: "Led and supported a range of advocacy, branding, storytelling, and public engagement initiatives for ELiDA, helping strengthen both the organization’s visibility and its connection with communities and audiences.",
    highlights: [
      "Supported ELiDA’s rebranding through refreshed communication approaches, visual storytelling direction, audience engagement strategies, and brand-centered public experiences.",
      "Led the conceptualization, creative direction, and facilitation of ELiDA’s exhibition presence at CSOs Week, transforming their booth into an immersive storytelling and engagement space featuring documentary screenings and branded advocacy materials.",
      "Developed and facilitated a national panel discussion during CSOs Week on Technology-Facilitated Gender-Based Violence (TFGBV) to foster dialogue on online violence, digital safety, and gender justice.",
      "Conceptualized and facilitated the organization’s 2025 16 Days of Activism closing event, designing an emotionally grounded space for solidarity and collective reflection around gender-based violence.",
      "Led field coordination, interviews, scripting, filming, and post-production of documentary impact stories across project sites in the Wollo area (Amhara Region), documenting stories of women’s leadership, girls’ education, and community resilience."
    ],
    deliverables: [
      "Rebranding Strategy & Brand Identity",
      "CSOs Week Exhibition Booth Design",
      "National Panel Discussion Facilitation",
      "16 Days of Activism Campaign Event",
      "Documentary Storytelling Production"
    ]
  },
  {
    slug: "setaweet-movement",
    title: "Setaweet Movement",
    subtitle: "Communications and Advocacy Consultancy",
    sector: "Gender Justice & Activism",
    focus: ["Strategic Communications", "Digital Activism", "Advocacy", "Ethical Storytelling"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
    overview: "Partnered with Setaweet Movement as a communications and advocacy consultancy partner supporting the organization’s broader movement-building, digital campaigns, and gender justice initiatives.",
    highlights: [
      "Contributed to strategic communications, advocacy engagement, digital activism, and campaign support designed to strengthen public dialogue around gender equality.",
      "Supported the Negari Project with communication strategy, digital campaign engagement, content creation, and visual/virtual advocacy representations that centered women’s voices and lived experiences.",
      "Ensured all advocacy spaces and virtual representations were built on a shared commitment to inclusion, ethical storytelling, and human-centered design."
    ],
    deliverables: [
      "Movement Building Strategy",
      "The Negari Project Campaigns",
      "Digital Activism Assets & Strategy",
      "Ethical Storytelling Framework"
    ]
  },
  {
    slug: "idea-creatives",
    title: "IDEA Creatives",
    subtitle: "Brand Presence & Social Media Management",
    sector: "Creative & Business Consultation",
    focus: ["Social Media Management", "Identity Branding", "Strategic Growth"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    overview: "Provided social media management and business management consultation support focused on strengthening the organization’s brand presence, communication consistency, audience engagement, and overall strategic growth.",
    highlights: [
      "Shaped a stronger, cohesive public identity and built meaningful connections with the audience through engaging, thoughtful, and visually driven content.",
      "Focused on helping the brand communicate with clarity, consistency, and purpose in ways that reflected its creative identity and long-term vision."
    ],
    deliverables: [
      "Business Management Advisory",
      "Social Media Management Strategy",
      "Content Style Guide",
      "Brand Growth Plan"
    ]
  },
  {
    slug: "women-deliver",
    title: "Women Deliver",
    subtitle: "Telela App Development & Youth Wellbeing",
    sector: "Digital Innovation & GESI",
    focus: ["Platform Design", "SRHR", "Youth Development", "Behavior Change"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    overview: "Developed the Telela App, a youth-centered, holistic wellbeing platform created to support adolescents and young people through accessible, engaging, and human-centered digital learning experiences.",
    highlights: [
      "Explored holistic topics including Sexual and Reproductive Health and Rights (SRHR), mental health, nutrition, puberty education, healthy relationships, life skills, and overall wellbeing in an inclusive and relatable manner.",
      "Led the conceptualization, content structuring, communication flow, and creative engagement approach, shaping Telela into a safe, interactive digital space for learning and self-reflection."
    ],
    deliverables: [
      "Telela App Platform Concept",
      "Wellbeing Content Structure",
      "Interactive Learning Design",
      "Adolescent Communication Strategy"
    ]
  },
  {
    slug: "ywca-ethiopia",
    title: "YWCA Ethiopia",
    subtitle: "Safeguarding Systems & Ethical Training",
    sector: "Safeguarding & Compliance",
    focus: ["Safeguarding", "Capacity Building", "Workplace Ethics", "GESI"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
    overview: "Provided safeguarding and training support for YWCA Ethiopia, focusing on strengthening inclusive, ethical, and community-centered organizational practices.",
    highlights: [
      "Supported safeguarding systems strengthening, risk awareness, survivor-centered approaches, and Gender-Based Violence (GBV) prevention and response to build safer, more accountable ways of working.",
      "Facilitated participatory and practical learning experiences across multiple areas, including leadership, capacity building, communication and advocacy, workplace ethics, GESI, and community engagement."
    ],
    deliverables: [
      "Safeguarding Systems Audit",
      "GBV Prevention Training",
      "Workplace Ethics Handbook",
      "Interactive Workshop Facilitation"
    ]
  }
];
