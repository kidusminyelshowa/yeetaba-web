import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('❌ Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-08',
  useCdn: false,
  token,
});

async function uploadLocalImage(relativePath) {
  if (!relativePath) return null;
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  const fullPath = path.join(process.cwd(), 'public', cleanPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️ Warning: Local image file not found at ${fullPath}`);
    return null;
  }

  try {
    const stream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload('image', stream, {
      filename: path.basename(fullPath),
    });
    return asset._id;
  } catch (err) {
    console.error(`  ❌ Failed to upload image ${relativePath}:`, err.message);
    return null;
  }
}

// Data to seed
const projectsData = [
  {
    slug: "elida",
    title: "ELiDA",
    subtitle: "Empathy for Life Integrated Development Association",
    sector: "Advocacy & Public Engagement",
    focus: ["Advocacy", "Branding", "Storytelling", "Gender Justice"],
    image: "/ELiDA.jpg",
    overview: "Led and supported a range of advocacy, branding, storytelling, and public engagement initiatives for ELiDA, helping strengthen both the organization’s visibility and its connection with communities and audiences.",
    highlights: [
      "Supported ELiDA’s rebranding through refreshed communication approaches, visual storytelling direction, audience engagement strategies, and brand-centered public experiences.",
      "Led the conceptualization, creative direction, and facilitation of ELiDA’s exhibition presence at CSOs Week, transforming their booth into an immersive storytelling and engagement space featuring documentary screenings and branded advocacy materials.",
      "Developed and facilitated a national panel discussion during CSOs Week on Technology-Facilitated Gender-Based Violence (TFGBV) to foster dialogue on online violence, digital safety, and gender justice.",
      "Conceptualized and facilitated the organization’s 2025 16 Days of Activism closing event, designing an emotionally grounded space for solidarity and collective reflection around gender-based violence.",
      "Led field coordination, interviews, scripting, filming, and post-production of documentary impact stories across project sites in the Wollo area (Amhara Region), documenting stories of women’s leadership, girls’ education, and community resilience."
    ],
    images: [
      "/ELiDA Image 1.jpg",
      "/ELiDA Image 2.jpg"
    ],
    deliverables: [
      "Rebranding Strategy & Brand Identity",
      "CSOs Week Exhibition Booth Design",
      "National Panel Discussion Facilitation",
      "16 Days of Activism Campaign Event",
      "Documentary Storytelling Production"
    ],
    sortOrder: 1,
  },
  {
    slug: "setaweet-movement",
    title: "Setaweet Movement",
    subtitle: "Communications and Advocacy Consultancy",
    sector: "Gender Justice & Activism",
    focus: ["Strategic Communications", "Digital Activism", "Advocacy", "Ethical Storytelling"],
    image: "/Setaweet.jpg",
    images: [
      "/Setaweet Image 1.jpg",
      "/Setaweet Image 2.jpg",
      "/Setaweet Image 3.jpg"
    ],
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
    ],
    sortOrder: 2,
  },
  {
    slug: "idea-creatives",
    title: "IDEA Creatives",
    subtitle: "Brand Presence & Social Media Management",
    sector: "Creative & Business Consultation",
    focus: ["Social Media Management", "Identity Branding", "Strategic Growth"],
    image: "/IDEA.jpg",
    images: [],
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
    ],
    sortOrder: 3,
  },
  {
    slug: "women-deliver",
    title: "Women Deliver",
    subtitle: "Telela App Development & Youth Wellbeing",
    sector: "Digital Innovation & GESI",
    focus: ["Platform Design", "SRHR", "Youth Development", "Behavior Change"],
    image: "/Women Deliver.png",
    images: [],
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
    ],
    sortOrder: 4,
  },
  {
    slug: "ywca-ethiopia",
    title: "YWCA Ethiopia",
    subtitle: "Safeguarding Systems & Ethical Training",
    sector: "Safeguarding & Compliance",
    focus: ["Safeguarding", "Capacity Building", "Workplace Ethics", "GESI"],
    image: "/influencing-governance.jpg",
    images: [
      "/malala-ywca-team-1.jpg"
    ],
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
    ],
    sortOrder: 5,
  }
];

const servicesData = [
  {
    sortOrder: 1,
    name: "Gender Equality and Social Inclusion (GESI)",
    description: "We provide gender analysis, inclusion audits, and advisory support to ensure programs and systems are equitable and responsive. Our work helps organizations translate inclusion into measurable outcomes. We also provide technical support for nutrition and public health programs, with a focus on behavior change and community-centered approaches.",
    image: "/GESI.jpeg"
  },
  {
    sortOrder: 2,
    name: "Safeguarding and Protection Systems",
    description: "We design and strengthen safeguarding frameworks that protect individuals and communities. This includes policy development, risk assessments, reporting systems, and staff training. We also support organizations to develop and operationalize ESG frameworks. This includes risk identification, compliance alignment, governance structures, and responsible practices.",
    image: "/Safeguarding.jpeg"
  },
  {
    sortOrder: 3,
    name: "Research and Evidence Generation",
    description: "We design and conduct qualitative and quantitative research to support decision-making, learning, and accountability. This includes assessments, evaluations, and evidence aligned with donor and regulatory expectations. We also support organizations to define direction, strengthen alignment, and improve operational effectiveness. Our work ensures strategies are practical and grounded in real contexts.",
    image: "/Research.jpeg"
  },
  {
    sortOrder: 4,
    name: "Communications, Advocacy and Brand",
    description: "We help organizations clearly articulate their identity and impact. This includes branding, storytelling, advocacy strategy, and stakeholder engagement. We also design and facilitate events that create meaningful engagement. Our approach ensures experiences are inclusive, well-structured, and impactful.",
    image: "/Communications.jpeg"
  }
];

async function seed() {
  console.log('🚀 Starting Sanity database seeding...\n');

  // Seed Projects
  console.log('📌 Seeding Projects...');
  for (const item of projectsData) {
    console.log(`  Processing Project: "${item.title}"`);

    const mainImageAssetId = await uploadLocalImage(item.image);
    const galleryAssetIds = [];

    if (item.images && item.images.length > 0) {
      for (const imgPath of item.images) {
        const assetId = await uploadLocalImage(imgPath);
        if (assetId) galleryAssetIds.push(assetId);
      }
    }

    const doc = {
      _type: 'project',
      _id: `project-${item.slug}`,
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      subtitle: item.subtitle,
      sector: item.sector,
      focus: item.focus,
      overview: item.overview,
      highlights: item.highlights,
      deliverables: item.deliverables,
      sortOrder: item.sortOrder,
    };

    if (mainImageAssetId) {
      doc.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainImageAssetId },
      };
    }

    if (galleryAssetIds.length > 0) {
      doc.galleryImages = galleryAssetIds.map((ref) => ({
        _type: 'image',
        asset: { _type: 'reference', _ref: ref },
      }));
    }

    await client.createOrReplace(doc);
    console.log(`  ✅ Project "${item.title}" created/updated.`);
  }

  // Seed Services
  console.log('\n📌 Seeding Services...');
  for (const s of servicesData) {
    console.log(`  Processing Service: "${s.name}"`);

    const imageAssetId = await uploadLocalImage(s.image);

    const doc = {
      _type: 'service',
      _id: `service-0${s.sortOrder}`,
      sortOrder: s.sortOrder,
      name: s.name,
      description: s.description,
    };

    if (imageAssetId) {
      doc.image = {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
      };
    }

    await client.createOrReplace(doc);
    console.log(`  ✅ Service "${s.name}" created/updated.`);
  }

  console.log('\n🎉 Seeding complete!');
}

seed().catch((err) => {
  console.error('Fatal error during seed:', err);
  process.exit(1);
});
