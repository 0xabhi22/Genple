"use client"
import { PaperclipIcon } from 'lucide-react'
import { API } from '@huddle01/server-sdk/api';
import { useState, useEffect } from "react";

export default function MainPage({ params }: { params: { id: string } }) {
  const [metrics, setMetrics] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.huddle01.com/api/v1/room-details/${params.id}`, {
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
        console.log(data)
        setMetrics(data);
      } catch (error: any) {
        console.log('Error fetching metrics:', error);
        setError(error || 'An error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (

    <>
      <div className="py-32">
        <div className="mx-auto max-w-7xl px-16 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-white">Space Details</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">Below are details of the space.</p>
              </div>
              <div className="mt-6 border-t border-white/10">
                <dl className="divide-y divide-white/10">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Name</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{metrics.title}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Room Id</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{metrics.roomId}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Description</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{metrics.description || "No description"}</dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Meeting Link</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{metrics.meetingLink}</dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Room Type</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{metrics.roomType}</dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Room Size</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{metrics.roomSize}</dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Video On Entry</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                      {metrics.videoOnEntry ? 'Yes' : 'No'}
                    </dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Mute On Entry</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                      {metrics.muteOnEntry ? 'Yes' : 'No'}
                    </dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">Room Locked</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                      {metrics.roomLocked ? 'Yes' : 'No'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
