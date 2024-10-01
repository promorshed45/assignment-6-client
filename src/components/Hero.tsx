"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 blur-xl h-[580px]"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="relative">
        <section>
          <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-white overflow-hidden md:px-8 md:flex justify-center items-center">
            <div className="flex-none space-y-5 max-w-xl">
              <Link
                href="/posts"
                className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border dark:border-dashed border-rose-100 dark:border-white/10 text-sm font-medium duration-150 hover:bg-transparent/10"
              >
                <span className="inline-block rounded-full px-3 py-1 bg-pink-600 text-white">
                  News
                </span>
                <p className="flex items-center text-default-foreground dark:text-default-600">
                  Read the launch post from here
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </Link>
              <div>
                <h1>
                  {" "}
                  <span className="text-left text-default-900 dark:text-default-500 font-medium tracking-tight max-w-md md:max-w-3xl text-3xl md:text-4xl  mr-auto lg:text-6xl font-geist  text-transparent bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] leading-0 md:leading-0 md:pb-0 mt-1">
                    {" "}
                    Explore the World with Confidence!{" "}
                  </span>{" "}
                  <span className="text-4xl">🌍✈️</span>{" "}
                </h1>
              </div>

              <p className="text-base text-gray-800 dark:text-gray-200 py-3">
                Unlock the secrets to unforgettable adventures with our expert
                travel tips and destination guides. From hidden gems to must-see
                landmarks, we’ve got you covered. Dive into local cultures,
                savor authentic cuisines, and make every journey memorable.
                Let’s embark on the adventure of a lifetime together!
              </p>

              <div className="flex items-center gap-x-3 sm:text-sm">
                <Link
                  href="/posts"
                  className="flex items-center justify-center gap-x-1 py-3 px-4 text-default-900 font-medium transform-gpu bg-rose-500/10 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] rounded-full md:inline-flex"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
