import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Logo from "../assets/logo.png";
import AppScreenshot from "../assets/app-screenshot.png";
import PostStoryScreenshot from "../assets/post-story-screenshot.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../client/queries/posts";
import { PostListingCard } from "../components/PostListingCard";

const footerNavigation = {
  main: [],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/defolio-core/defolio",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export function IndexPage() {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      getPosts({
        page: 1,
        perPage: 6,
      }),
  });
  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <img className="h-16 w-auto" src={Logo} />
              </div>
              <div className="mt-20">
                <div>
                  <a
                    href="https://chain.link/hackathon"
                    target="_blank"
                    className="inline-flex space-x-4"
                  >
                    <span className="rounded bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-500">
                      Constellation: A Chainlink Hackathon
                    </span>
                    <span className="inline-flex items-center space-x-1 text-sm font-medium text-slate-500">
                      <span>v0.1.0</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </div>
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    A Platform for writers and readers on Web3
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Create your own space, publish your content, and share your
                    stories on
                    <strong className="text-red-400 inline-flex items-center ml-2">
                      <svg
                        width="1503"
                        height="1504"
                        viewBox="0 0 1503 1504"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 inline mr-1"
                      >
                        <rect
                          x="287"
                          y="258"
                          width="928"
                          height="844"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z"
                          fill="#E84142"
                        />
                      </svg>
                      Avalanche Blockchain
                    </strong>
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/app"
                    className="rounded-md border border-transparent bg-slate-700 px-5 py-3 text-base font-medium text-white shadow hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:px-10"
                  >
                    Launch App
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </svg>
              </div>
              <div className="relative -mr-40 pl-6 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src={AppScreenshot}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial/stats section */}
        <div className="relative mt-20">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
            <div className="relative sm:py-16 lg:py-0">
              <div
                aria-hidden="true"
                className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
              >
                <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72" />
                <svg
                  className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                  />
                </svg>
              </div>
              <div className="relative mx-auto max-w-md px-6 sm:max-w-4xl lg:max-w-none lg:px-0 lg:py-20 w-full">
                {/* Testimonial card*/}
                <div className=" rounded-2xl pb-10 w-full bg-slate-200 p-6">
                  <img
                    className=""
                    src={PostStoryScreenshot}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:px-0">
              {/* Content area */}
              <div className="pt-12 sm:pt-16 lg:pt-20">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  About
                </h2>
                <div className="mt-6 space-y-6 text-gray-500">
                  <p className="text-lg">
                    DeFolio is a platform designed for writers and readers in
                    the dynamic realm of Web3, powered by the Avalanche
                    Blockchain.
                  </p>

                  <p className="text-lg">
                    At DeFolio, we're dedicated to fostering a thriving
                    ecosystem where writers can create, share their content
                    while offering readers a diverse array of engaging and
                    decentralized literary works.
                  </p>
                  <p className="text-lg">
                    Our platform harnesses the groundbreaking potential of Web3
                    technology, ensuring transparency, security, and fairness
                    for all participants. Through blockchain-powered smart
                    contracts, writers can directly connect with their audience,
                    receive fair compensation for their creations, and maintain
                    full ownership and control over their intellectual property.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {posts && posts?.length > 0 && (
            <div className="w-full mx-auto max-w-5xl text-center my-32">
              <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Recent Posts
              </h2>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {posts &&
                  posts.map((post) => (
                    <PostListingCard
                      post={post}
                      url={`/${post.space?.slug || ""}/${post?.slug}`}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer section */}
      <footer className="mt-24 bg-gray-900 sm:mt-12">
        <div className="mx-auto max-w-md overflow-hidden py-12 px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            {footerNavigation.main.map((item: any) => (
              <div key={item.name} className="px-5 py-2">
                <a
                  href={item.href}
                  className="text-base text-gray-400 hover:text-gray-300"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 DeFolio, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
