"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { Toaster, toast } from 'sonner';


interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

const createRandomRoom = async (namex: string, despc: string) => {
  const res = await fetch('https://api.huddle01.com/api/v1/create-room', {
    method: 'POST',
    body: JSON.stringify({
      title: namex,
      description: despc,
      roomType: "AUDIO"
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY ?? 'mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ',
    },
    cache: 'no-store',
  });
  const data: RoomDetails = await res.json();
  const { roomId } = data.data;
  return roomId;
};

export default function Home() {
  const { push } = useRouter();


  const handleIntroPage = async () => {
    const inputElement = document.getElementById('name') as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input value:', inputValue);

    const despc = document.getElementById('description') as HTMLInputElement;
    console.log('Descp value:', despc.value);

    const roomId = await createRandomRoom(inputValue, despc.value);
    toast.success("Your space has been created!");

    push(`/${roomId}/lobby`);
    return null;
  }

  return (
    <>
      <Toaster />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full py-20">
        <div className="mx-auto max-w-3xl py-12">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Welcome!</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new room.</p>
            <div className="mt-6">

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Create New Room</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Enter details below to create your new room.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4 mb-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Type room title..."
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        placeholder="Type room description..."
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleIntroPage}><PlusCircleIcon className='mr-3' /> Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
