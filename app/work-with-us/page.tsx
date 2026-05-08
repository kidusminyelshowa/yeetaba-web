export default function WorkWithUsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen pt-32 px-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white mb-8">
          Work With Us
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">
          Ready to start a project? We'd love to hear from you.
        </p>
        
        <form className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
            <input type="text" id="name" className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
            <input type="email" id="email" className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Message</label>
            <textarea id="message" rows={4} className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"></textarea>
          </div>
          <button type="submit" className="w-fit px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
