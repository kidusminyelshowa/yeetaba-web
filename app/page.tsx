import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Ye Etaba.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          A high-end consultancy studio dedicated to crafting exceptional digital narratives and strategic design solutions.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <a 
            href="/projects" 
            className="px-8 py-4 bg-brand-primary text-brand-secondary font-bold rounded-full hover:scale-105 transition-transform"
          >
            Explore Projects
          </a>
          <a 
            href="/work-with-us" 
            className="px-8 py-4 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </main>
  );
}
