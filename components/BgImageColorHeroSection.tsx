import React from "react";
import Image from "next/image";

import bg from "../public/images/OB_winter-desktop.png";
import Link from "next/link";

export default function BgImageColorHeroSection() {
  return (
    <div className="relative -mx-5 -my-6 sm:-mx-6">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="max-w-7xl mx-auto">
        <div className="relative shadow-xl sm:rounded-tl-lg sm:rounded-tr-lg sm:overflow-hidden">
          <div className="absolute inset-0">
            <Image
              className="h-full w-full object-cover"
              src={bg}
              alt="happy bunnies in jackets and winter clothes making a snowman"
            />
            <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">
                The FIRST NFT Collections
              </span>
              <span className="block text-indigo-200">only on Optimism...</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto font-semibold text-center text-xl text-indigo-100 sm:max-w-3xl">
              For every Optimistic Bunny you mint, will also get a Pixelated
              Bunny airdropped to you for free within ~1-2 weeks. For each new
              BUNNY holder, one Optiland Citizen will be airdropped for free as
              well (while they last).
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link href="/mint" passHref>
                  <div className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8 cursor-pointer">
                    Mint
                  </div>
                </Link>
                <Link href="/collections" passHref>
                  <div className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8 cursor-pointer">
                    View
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
