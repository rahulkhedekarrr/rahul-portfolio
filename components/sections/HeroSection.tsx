import HeroCard from "./HeroCard";

const HeroSection = () => {
  return (
    <section className="relative z-10 flex min-h-[100svh] items-center px-4 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <HeroCard />
      </div>
    </section>
  );
};

export default HeroSection;
