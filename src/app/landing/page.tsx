"use client"
import ImageComponent from "@/components/ImageComponent";
import LandingHeader from "./sections/LandingHeader";
import HeroHeader from "@/components/HeroHeader";
import { bannerImg } from "@/utils";
import Section from "@/components/Section";
import { mission, ourIdentity, ourStory, vision } from "@/constants";
import MissionVision from "@/app/landing/sections/MissionVision";



export default function Landing (){
    return(
        <div>
        <LandingHeader />
        <HeroHeader
  imageSrc={bannerImg}
  title="Welcome to Our Platform"
  description="Discover amazing features and possibilities with our cutting-edge solution."
  buttonText="Get Started"
  onButtonClick={() => console.log('Button clicked!')}
/>
<Section
  sectionTitle="Our Identiy"
  header="Devstrike Digital Limited is a dynamic tech company dedicated to crafting cutting-edge digital solutions."
  subheader="We specialise in software development, website design, and mobile applications, helping businesses and individuals thrive in the digital age." // optional
  body={ourIdentity}
/>
<MissionVision
  mission={mission}
  vision={vision}
/>

<Section
  sectionTitle="Our Story"
  header="A Journey of Innovation and Inspiration"
  subheader="Building the future of web development" // optional
  body={ourStory}
/>
        </div>
    );
}