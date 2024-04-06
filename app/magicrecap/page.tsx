"use client"
import { ChevronRightIcon, CodesandboxIcon as CodeSquareIcon } from 'lucide-react'
import { API } from '@huddle01/server-sdk/api';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import ProcessAudio from "./create_summary";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { checkIfExists } from "./create_summary";

const textpp = `Uses Prisma to query the MagicRecaps model.
Filters the results using the where clause, specifying that the recordingId should match the provided recordingId argument.
Awaits the completion of the Prisma query and assigns the results to the magicRecaps constant.
Returns the magicRecaps array containing the matching records.
Includes error handling using a try...catch block. If an error occurs during the Prisma query, it logs the error to the console and re-throws the error for further handling.`;


export default function MainPage() {
    const { push } = useRouter();

    const [recordings, setRecordings] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setError(null);

            try {
                const response = await fetch("https://api.huddle01.com/api/v1/get-recordings", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'x-api-key': process.env.REACT_APP_API_KEY || "mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ",
                    },
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();
                console.log(data, data.recordings)
                setRecordings(data.recordings);
            } catch (error: any) {
                console.log('Error fetching metrics:', error);
                setError(error || 'An error occurred.');
            }
        };

        fetchData();
    }, []);




    const handleProcess = async (recordingLink: string, recordingId: string) => {
        // Checking if the summary already exists.
        if (await checkIfExists(recordingId)) {
            push(`/magicrecap/${recordingId}`);
        }

        setLoading(true);
        toast.success("Processing has been started...");

        console.log(recordingLink);

        // const recordingLink = "https://filebin.net/s40pcm8ig6t9jsvd/ElevenLabs_2024-04-01T11_59_44_Chris_pre_s50_sb75_se0_b_m2.mp3";

        const res = await ProcessAudio(recordingLink, recordingId);
        console.log(res)

        setLoading(false);
        toast.success("Your recording has been finished!");

        push(`/magicrecap/${recordingId}`);
    }


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
                        {recordings?.map((item: any) => (
                            <li key={item.roomId} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <CodeSquareIcon className="h-12 w-12 flex-none rounded-full bg-gray-50" />


                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900  cursor-pointer ">
                                                    <div>
                                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                                        {item.id}
                                                    </div>
                                                </p>
                                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                                    <a href={`${item.recordingUrl}`} className="relative truncate hover:underline">
                                                        {item.recordingUrl}
                                                    </a>
                                                </p>
                                            </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Do you want to process this?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Click continue to process this recording to buildup your AI generated magic recaps. Please wait fro some time.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button disabled={loading} onClick={() => handleProcess(item.recordingUrl, item.id)}>
                                                    {loading && (
                                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                    )}
                                                    Continue
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>


                                    {/* <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <div onClick={() => handleProcess(item.recordingUrl)}>
                                                <span className="absolute inset-x-0 -top-px bottom-0" />
                                                {item.id}
                                            </div>
                                        </p>
                                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                            <a href={`${item.recordingUrl}`} className="relative truncate hover:underline">
                                                {item.recordingUrl}
                                            </a>
                                        </p>
                                    </div> */}
                                </div>
                                <div className="flex shrink-0 items-center gap-x-4">
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900"><b>Recording Size: </b> {item.recordingSize}</p>
                                        {item?.startTime ? (
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
