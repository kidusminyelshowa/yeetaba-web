import type { Metadata } from "next";
import WorkWithUsClient from "./WorkWithUsClient";

export const metadata: Metadata = {
  title: "Work With Us | Ye Etaba Consultancy",
  description: "Ready to start a project? Partner with Ye Etaba Consultancy to build strong systems, clearer strategy, and better integration of safeguarding, ESG, and inclusion.",
  openGraph: {
    title: "Work With Us | Ye Etaba Consultancy",
    description: "Partner with Ye Etaba Consultancy to build strong systems, clearer strategy, and better integration of safeguarding, ESG, and inclusion.",
  },
};

export default function WorkWithUsPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <WorkWithUsClient />
    </main>
  );
}
