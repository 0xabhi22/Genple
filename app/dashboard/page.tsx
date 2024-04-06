"use client";
import React, { useState, useEffect } from 'react';


export default function MainPage() {
    const [metrics, setMetrics] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); 

            try {
                const response = await fetch("https://api.huddle01.com/api/v1/get-metrics", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'x-api-key': process.env.REACT_APP_API_KEY || "mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ", // Replace with your environment variable
                    },
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();
                setMetrics(data);
            } catch (error: any) {
                console.log('Error fetching metrics:', error);
                setError(error || 'An error occurred.'); // Set a user-friendly error message
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to fetch data only once on component mount

    return (
        <>
            <div className="bg-white py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Genple</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl leading-8 text-gray-800 font-bold">
                                    Welcome to Genple - Your Ultimate Dashboard!
                                </p>
                                <p className="mt-4 text-gray-600">
                                    Get a comprehensive overview of your Genple space. Our intuitive dashboard provides you with key metrics, including the number of Spaces, Participants, and more.
                                </p>
                                <p className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                    In short, you have total <b>{metrics.totalUsers}</b> users, in <b>{metrics.totalMeetings}</b> meetings so far. With total duration accounts to <b>{metrics.totalDuration} minutes</b>. And have recorded <b>{metrics.recordingCount}</b> times as of now. With <b>{metrics.livestreamCount}</b> livestreams.
                                </p>

                            </div>
                            <div className="lg:flex lg:flex-auto lg:justify-center">
                                <dl className="w-64 space-y-8 xl:w-80">
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">Total Meetings</dt>
                                        <dd className="text-5xl font-semibold tracking-tight text-gray-900">{metrics.totalMeetings}</dd>
                                    </div>
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">Total Users</dt>
                                        <dd className="text-5xl font-semibold tracking-tight text-gray-900">{metrics.totalUsers}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Get more Insights</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-300">
                                Below shows total duration and other metrics.
                            </p>
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">Livestream</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{metrics.livestreamCount}</dd>
                            </div>
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">GatedMeetings</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{metrics.tokenGatedMeetings}</dd>
                            </div>
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">Total Duration</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{metrics.totalDuration}</dd>
                            </div>
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">Total Recordings</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{metrics.recordingCount}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}
