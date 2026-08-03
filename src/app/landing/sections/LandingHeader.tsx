import { ourIntro } from "@/constants";

function LandingHeader() {
  return (
    <header className="container mx-auto bg-white px-4 py-12 md:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl">
        Empowering Innovation, Transforming Tomorrow:
      </h1>
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
        Welcome to{' '}
        <span className="bg-brand-gradient bg-clip-text text-transparent">
          Devstrike
        </span>
      </h1>

      <p className="mb-8 w-full text-sm leading-relaxed text-gray-600 sm:w-2/3 md:text-base lg:w-1/2">
        {ourIntro}
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="/projects"
          className="w-full rounded-md bg-[#E4C7D566] px-6 py-3 text-center font-bold text-primary transition-colors hover:bg-[#753A52] hover:text-white sm:w-auto"
        >
          Discover Projects
        </a>
        <a
          href="#footer"
          className="w-full rounded-md bg-brand-gradient-b px-6 py-3 text-center font-bold text-white transition duration-300 hover:opacity-90 sm:w-auto"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

export default LandingHeader;
