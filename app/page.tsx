"use client";
import ProfileCard from "@/HomePage/components/ProfileCard/ProfileCard";
import AboutSection from "@/HomePage/components/Sections/about/AboutSection";
import HighlightsSection from "@/HomePage/components/Sections/about/HighlightsSection";
import PortfolioSection from "@/HomePage/components/Sections/about/PortfolioSection";
import NavigationTab from "@/HomePage/components/Sections/NavigationTab";
import ResumeSection from "@/HomePage/components/Sections/resume";
import {
  FAQJsonLd,
  ProfilePageJsonLd,
  SoftwareApplicationJsonLd
} from "next-seo";
import { Fragment, useState } from "react";


export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Fragment>
      <ProfilePageJsonLd
        mainEntity={{
          name: "Mukesh M",
          description: "Full Stack Developer — Web, Android, iOS, Desktop Apps",
          url: "https://www.themukesh.com",
          sameAs: [
            "https://github.com/rtrmukesh",
            "https://www.linkedin.com/in/mukesh-m-6b9404242",
            "https://www.instagram.com/rtr_mukesh_/",
          ],
        }}
        dateCreated="2020-01-01"
        dateModified="2025-12-06"
      />
      <SoftwareApplicationJsonLd
        name="Mukesh M — Portfolio Web App"
        description="Portfolio of Mukesh M — Full Stack Developer building Web, Android, iOS & Desktop applications using modern tech stacks."
        applicationCategory="WebApplication"
        operatingSystem="All"
        url="https://www.themukesh.com"
      />
      <SoftwareApplicationJsonLd
        name="Android Mobile Apps by Mukesh M"
        description="High-performance Android applications built using React Native, Kotlin, and Node.js backend — by Full Stack Developer Mukesh M."
        applicationCategory="MobileApplication"
        operatingSystem="Android"
        url="https://www.themukesh.com"
      />

      <SoftwareApplicationJsonLd
        name="iOS Mobile Apps by Mukesh M"
        description="Modern and high-quality iOS applications developed using React Native and Node.js backend — by Full Stack Developer Mukesh M."
        applicationCategory="MobileApplication"
        operatingSystem="iOS"
        url="https://www.themukesh.com"
      />

      <FAQJsonLd
        questions={[
          {
            question: "What technologies do you work with?",
            answer:
              "React, Next.js, Node.js, React Native, Android, iOS, and Desktop applications.",
          },
          {
            question: "Can I hire you for mobile apps?",
            answer:
              "Yes! I professionally build both Android and iOS mobile applications.",
          },
          {
            question: "Do you offer freelance services?",
            answer:
              "Yes, I am available for freelance work — Web apps, Mobile apps, UI/UX, and API development.",
          },
          {
            question: "Where are you located?",
            answer:
              "I am based in Tamil Nadu, India and I work remotely with clients worldwide.",
          },
        ]}
      />

      <main className="bg-[#0b0b0d] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12">
          {/* Desktop | Two Column */}
          <div className="hidden lg:flex gap-[2.3%]">
            {/* Left Sticky ProfileCard */}
            <div className="flex-shrink-0 sticky top-8 self-start border border-white/15 rounded-3xl  backdrop-blur-sm">
              <ProfileCard />
            </div>

            {/* Right Scrollable Content */}
            <div className="flex-1  border border-white/15  rounded-[1.25rem]  backdrop-blur-sm">
              <NavigationTab setTabIndex={setTabIndex} tabIndex={tabIndex} />
              {tabIndex == 0 && (
                <>
                  <AboutSection />
                  <HighlightsSection />
                  <PortfolioSection />
                </>
              )}

              {tabIndex == 1 && <ResumeSection />}
            </div>
          </div>

          {/* Mobile | Single Column */}
          <div className="lg:hidden space-y-7 pb-28">
            <ProfileCard isMobile={true} />
            <div className="relative">
              <NavigationTab setTabIndex={setTabIndex} tabIndex={tabIndex} />
              {tabIndex == 0 && (
                <>
                  <AboutSection />
                  <HighlightsSection />
                  <PortfolioSection />
                </>
              )}
              {tabIndex == 1 && <ResumeSection />}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
