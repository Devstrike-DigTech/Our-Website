"use client"
import LandingHeader from "./sections/LandingHeader";
import HeroHeader from "@/components/HeroHeader";
import { bannerImg } from "@/utils";
import Section from "@/components/Section";
import { mission, ourIdentity, ourStory, vision } from "@/constants";
import MissionVision from "@/app/landing/sections/MissionVision";

export default function Landing() {
  return (
    <div>
      <LandingHeader />
      <HeroHeader imageSrc={bannerImg} />
      <Section
        id="our-identity"
        sectionTitle="Our Identity"
        header="Devstrike Digital Limited is a dynamic tech company dedicated to crafting cutting-edge digital solutions."
        subheader="We specialise in software development, website design, and mobile applications, helping businesses and individuals thrive in the digital age."
        body={ourIdentity}
      />
      <MissionVision mission={mission} vision={vision} />
      <Section
        sectionTitle="Our Story"
        header="A Journey of Innovation and Inspiration"
        subheader="Building the future of web development"
        body={ourStory}
      />
    </div>
  );
}
