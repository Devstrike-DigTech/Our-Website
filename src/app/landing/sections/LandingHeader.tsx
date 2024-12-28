import { ourIntro } from "@/constants";

function LandingHeader() {
  return (
    <header className="bg-white py-12 px-4 ">
      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Empowering Innovation, Transforming Tomorrow: 
      </h1>
         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Welcome to{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#951E59] to-[#353B77]">
          Devstrike
        </span>
      </h1>

      {/* Subheading */}
    <p className="text-sm md:text-base text-gray-600 mb-8 w-full sm:w-1/2 text-justify">
  {ourIntro}
</p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row  items-center gap-4">
        {/* Discover Projects button */}
        <a
          href="/projects"
          className="bg-[#E4C7D566] hover:bg-[#753A52] text-[#951E59] hover:text-white font-bold py-3 px-6 rounded-md w-full sm:w-auto"
        >
          Discover Projects
        </a>

        {/* Get in touch button */}
        <a
          href="#footer"
          className="bg-gradient-to-b from-[#951E59] to-[#353B77] hover:from-[#353B77] hover:to-[#951E59] text-white font-bold py-3 px-6 rounded-md w-full sm:w-auto transition duration-300"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

export default LandingHeader;
