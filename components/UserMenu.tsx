import React, { useState, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { metaMask } from "../lib/connectors/metaMask";

import { NavLink } from "../lib";
import { classNames } from "../lib/helpers";
import { CreditCardIcon } from "@heroicons/react/outline";
import ETHBalance from "./ETHBalance";
import useMetaMaskOnboarding from "../lib/hooks/useMetaMaskOnboarding";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";

export default function UserMenu() {
  const { account, error, isActive, isActivating } = useWeb3React();

  const activate = async () => {
    return await metaMask.activate(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
  };

  const [connecting, setConnecting] = useState(false);

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  useEffect(() => {}, []);

  useEffect(() => {
    if (isActive || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [isActive, error, stopOnboarding]);

  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  const userNavInitialState: NavLink[] = [
    { name: "Your Optiland NFT's", href: "/view" },
  ];
  const [userNavigation] = useState<NavLink[]>(userNavInitialState);

  if (typeof account !== "string") {
    return isWeb3Available ? (
      <button
        className="max-w-xs px-3 py-1 bg-gray-900 text-gray-400 hover:text-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-pointer"
        disabled={isActivating || connecting}
        onClick={() => {
          setConnecting(true);
          isMetaMaskInstalled
            ? activate().catch((error) => {
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                  alert(error.message);
                }
              })
            : startOnboarding();
        }}
      >
        {isMetaMaskInstalled ? (
          <span className="flex items-center">
            <span className="pr-2">Connect</span>
            <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        ) : (
          "Connect to Wallet"
        )}
      </button>
    ) : (
      <button
        className="max-w-xs px-3 py-1 bg-gray-900 text-gray-400 hover:text-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        onClick={startOnboarding}
      >
        Install Metamask
      </button>
    );
  }

  return (
    <Menu as="div" className="ml-3 relative">
      <Menu.Button className="max-w-xs px-3 py-1 bg-gray-900 text-gray-400 hover:text-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
        <span className="sr-only">open account menu</span>
        {/* if user profile images get used, use the below */}
        {/* <Image
        className="h-8 w-8 rounded-full"
        src={user.imageUrl}
        alt=""
      /> */}
        <ETHBalance />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) =>
                item.onClick ? (
                  <div
                    onClick={item.onClick}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </a>
                )
              }
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
