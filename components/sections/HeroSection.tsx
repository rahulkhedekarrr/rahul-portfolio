import HeroCard from "./HeroCard";

const HeroSection = () => {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll pt-32 sm:pt-32">
      <div className="max-w-7xl mx-auto text-center">
        <HeroCard />
      </div>
    </section>
  );
};

export default HeroSection;
