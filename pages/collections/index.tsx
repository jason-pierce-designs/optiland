import React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import DarkNavbar from "../../components/DarkNavbar";
import DarkOverlapShell from "../../components/DarkOverlapShell";

import NeonCity from "/public/images/neon-city-bg.jpg";
import PinkAlley from "/public/images/pink-alley-bg.jpg";
import AlleyCity from "/public/images/apt-tower-bg.jpg";
import AptMoonlight from "/public/images/apt-moonlight.jpg";
import Footer from "../../components/Footer";

const collections = [
  {
    name: "Optimistic Bunnies",
    href: "/collections/bunny",
    imageSrc: PinkAlley,
    imageAlt: "a pink alley way",
  },
  {
    name: "Pixelated Bunnies",
    href: "/collections/pbunny",
    imageSrc: AlleyCity,
    imageAlt: "a run down alley way",
  },
  {
    name: "Coming Soon!",
    href: "#",
    imageSrc: AptMoonlight,
    imageAlt: "an apartment complex at night in the moonlight",
  },
];

export default function Collections() {
  return (
    <>
      <Layout>
        <DarkNavbar activePath="/collections" />
        <DarkOverlapShell title="Optiland Collections">
          <div className="relative bg-white rounded-lg shadow">
            <div className="relative bg-white pb-24">
              {/* Background image and overlap */}
              <div
                aria-hidden="true"
                className="hidden absolute inset-0 sm:flex sm:flex-col"
              >
                <div className="flex-1 relative w-full bg-gray-800">
                  <div className="block absolute inset-0 overflow-hidden">
                    <Image
                      src={NeonCity}
                      alt="background of a city with neon lights"
                      className="w-full h-full object-center object-cover rounded-lg"
                      layout="intrinsic"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-900 opacity-50" />
                </div>
                <div className="w-full bg-white h-32 md:h-40 lg:h-48" />
              </div>

              <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
                {/* Background image and overlap */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex flex-col sm:hidden"
                >
                  <div className="flex-1 relative w-full bg-gray-800">
                    <div className="block absolute inset-0 overflow-hidden">
                      <Image
                        src={NeonCity}
                        alt="background of a city with neon lights"
                        className="w-full h-full object-center object-cover"
                        layout="intrinsic"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gray-900 opacity-50" />
                  </div>
                  <div className="w-full bg-white h-48" />
                </div>
                <div className="relative py-32">
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                    choose a collection
                  </h1>
                  {/* <div className="mt-4 sm:mt-6">
                    <a
                      href="#"
                      className="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
                    >
                      View Original Bunny set
                    </a>
                  </div> */}
                </div>
              </div>

              <section
                aria-labelledby="collection-heading"
                className="-mt-96 relative sm:mt-0"
              >
                <h2 id="collection-heading" className="sr-only">
                  Collections
                </h2>
                <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
                  {collections.map((collection) => (
                    <div
                      key={collection.name}
                      className="group relative h-96 bg-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5"
                    >
                      <div>
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 rounded-lg overflow-hidden"
                        >
                          <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                            <Image
                              src={collection.imageSrc}
                              alt={collection.imageAlt}
                              className="w-full h-full object-center object-cover"
                              layout="intrinsic"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                        </div>
                        <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                          <div>
                            <p
                              aria-hidden="true"
                              className="text-sm text-white"
                            >
                              View collection
                            </p>
                            <h3 className="mt-1 font-semibold text-white">
                              <a href={collection.href}>
                                <span className="absolute inset-0" />
                                {collection.name}
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </DarkOverlapShell>
        <Footer />
      </Layout>
    </>
  );
}
