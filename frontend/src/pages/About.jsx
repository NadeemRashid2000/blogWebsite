import React from "react";

const AboutPage = () => {
  return (
    <>
      <section className="min-h-screen bg-neutral-800 text-neutral-100 py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Title */}
          <header className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              About <span className="text-sky-400">MyBlog</span> & Myself
            </h1>

          </header>

          {/* Description */}
          <div className="space-y-6 text-lg leading-relaxed text-neutral-300">
            <p>
              <strong className="text-white">MyBlog</strong> is a place to read helpful articles about web development and computer science. Whether you're learning frontend, backend, or CS fundamentals — this site is made to simplify the process.
            </p>

            <p>
              I'm <strong className="text-white">Nadeem Rashid</strong>, a curious developer who enjoys writing and building. I started SimpleBlog to track what I learn and hopefully help others along the way.
            </p>
          </div>


          {/* Connect Section */}
          <aside className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">📬 Connect with Me</h2>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                GitHub:{' '}
                <a
                  href="https://github.com/NadeemRashid2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline"
                >
                  github.com/NadeemRashid2000
                </a>
              </li>
              <li>
                LinkedIn:{' '}
                <span className="italic text-neutral-500">[add your link]</span>
              </li>
              <li>
                Email:{' '}
                <span className="italic text-neutral-500">[nadeem192121@gmail.com]</span>
              </li>
            </ul>
          </aside>

        </div>
      </section>
    </>
  );
};

export default AboutPage;

