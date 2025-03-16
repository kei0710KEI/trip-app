import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
          Let's Create Your Trip
        </h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8">
          AI will propose the ideal trip plan for you
        </p>
        <Link href="/create-trip">
          <button className=" animate-bounce cursor-pointer bg-white text-indigo-600 px-8 py-2 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
            Start Now
          </button>
        </Link>
        <p className="mt-4 text-sm opacity-80">It's free to start</p>
      </div>
    </section>
  );
};

export default CTA;
