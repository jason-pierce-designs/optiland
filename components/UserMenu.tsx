import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Account from "./Account";
import useEagerConnect from "../lib/hooks/useEagerConnect";
import { useWeb3React } from "@web3-react/core";
import { NavLink } from "../lib";
import { classNames } from "../lib/helpers";

export default function UserMenu() {
  const { deactivate, account } = useWeb3React();

  const userNavInitialState: NavLink[] = [
    { name: "Your Optiland NFT's", href: "/view" },
    { name: "Disconnect wallet", onClick: deactivate },
  ];
  const [userNavigation] = useState<NavLink[]>(userNavInitialState);
  const triedToEagerConnect = useEagerConnect();

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs px-3 py-1 bg-gray-900 text-gray-400 hover:text-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          {/* if user profile images get used, use the below */}
          {/* <Image
        className="h-8 w-8 rounded-full"
        src={user.imageUrl}
        alt=""
      /> */}
          {/* and remove the Connect and wallet icon below*/}
          {/* <span className="pr-2">Connect</span>
      <CreditCardIcon
        className="h-6 w-6"
        aria-hidden="true"
      /> */}
          <Account triedToEagerConnect={triedToEagerConnect} />
        </Menu.Button>
      </div>
      {account ? (
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
      ) : (
        <></>
      )}
    </Menu>
  );
}
