"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Tally4Icon as Bars3Icon, BellIcon, XSquareIcon as XMarkIcon, PlusIcon, SparkleIcon, PresentationIcon, LayoutDashboardIcon } from 'lucide-react'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from 'sonner';


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://avatar.iran.liara.run/public/7',
}

const navigation = [
  { name: 'GenPle', href: '/', current: true },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleChanges = (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get values from input fields
    const enteredName = e.target.elements.name.value;
    const enteredApiKey = e.target.elements.apikey.value;

    // Create an object to store both values
    const dataToSave = {
      name: enteredName,
      apiKey: enteredApiKey,
    };

    // Stringify the data object before storing in local storage
    const dataString = JSON.stringify(dataToSave);
    localStorage.setItem('userData', dataString);

    // Optional: Clear input fields after saving (adjust as needed)
    setName('');
    setApiKey('');

    // Alert or display a success message (optional)
    toast.success('Changes saved successfully!');
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 bg-gray-100 w-auto"
                    style={{ 'borderRadius': '10px' }}
                    src="logo.png"
                    alt="Genple"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <Link href={"/spaces"}
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <PresentationIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Your Spaces
                  </Link>
                </div>
                <div className="flex-shrink-0 mr-3">
                  <Link href={"/magicrecap"}
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <SparkleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    MagicRecaps
                  </Link>
                </div>
                <div className="flex-shrink-0 mr-3">
                  <Link href={"/dashboard"}
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <LayoutDashboardIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Dashboard
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"ghost"}>Settings</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Settings</DialogTitle>
                              <DialogDescription>
                                Change your genple settings here.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  placeholder="type name here..."
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="apikey" className="text-right">
                                  API Key:
                                </Label>
                                <Input
                                  id="apikey"
                                  placeholder="Type api key here..."
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" onClick={handleChanges} >Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>


                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href={"/about"}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              About
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* <div className="mt-3 space-y-1 px-2 sm:px-3">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>


    // <header className="border-b border-custom-1 w-full absolute top-0 left-0 h-16 flex items-center px-10 z-10 text-slate-100 justify-between">
    //   <Image
    //     src="/images/Logo.png"
    //     alt="logo"
    //     width={180}
    //     height={180}
    //     className="object-contain"
    //     quality={100}
    //     priority
    //   />
    // </header>
  );
};
export default Navbar;
