"use client"
import Navbar from "@/components/common/Navbar";
import HuddleContextProvider from "@/components/ClientComponents/HuddleContextProvider";
import { cn } from "@/utils/helpers";
import IntroPage from '@/components/IntroPage/IntroPage';

interface RoomDetails {
    message: string;
    data: {
        roomId: string;
    };
}

import { ChevronRightIcon, CodesandboxIcon as CodeSquareIcon } from 'lucide-react'

const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
]


import { API } from '@huddle01/server-sdk/api';
import { useState, useEffect } from "react";
// import getAllrooms from "./fetchRooms";

const getAllrooms = async () => {
    const api = new API({
        apiKey: process.env.API_KEY || "mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ",
    });

    const rooms = await api.getRooms();
    console.log(rooms?.data);
    return rooms?.data;
};



export default function MainPage() {
    const [allRooms, setAllRooms] = useState<any>(null);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const rooms = await getAllrooms();
                console.log(rooms, rooms?.rooms);
                setAllRooms(rooms?.rooms);
                // setIsLoading(false);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl mb-6">

                    <div className="mt-6 mb-4 w-full justify-between flex items-center px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-white">Your Rooms</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400"><button
                            type="button"
                            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Reload Rooms</button></p>
                    </div>

                    <ul
                        role="list"
                        className="divide-y mb-4 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                    >
                        {allRooms?.map((item: any) => (
                            <li key={item.roomId} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <CodeSquareIcon className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <a href={`/spaces/${item.roomId}`}>
                                                <span className="absolute inset-x-0 -top-px bottom-0" />
                                                {item.roomId}
                                            </a>
                                        </p>
                                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                            <a href={`${item.meetingLink}`} className="relative truncate hover:underline">
                                                {item.meetingLink}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-4">
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900"><b>RoomType: </b> {item.roomType}</p>
                                        {item.startTime ? (
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Last seen <time dateTime={item.startTime}>{item.startTime}</time>
                                            </p>
                                        ) : (
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                            </div>
                                        )}
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </>
    )
}
