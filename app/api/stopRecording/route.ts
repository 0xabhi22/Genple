import { NextRequest, NextResponse } from 'next/server';
import { Recorder } from '@huddle01/server-sdk/recorder';
 
interface Recordings {
  id: string;
  recordingUrl: string;
  recordingSize: number;
}
 
export async function GET( request: Request ) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId'); 
  console.log(roomId);

 
  //creating the Recorder class instance
  const recorder = new Recorder(
    process.env.NEXT_PUBLIC_PROJECT_ID || "n0_pMNrjW_S6lyo0K2MwzWKVOVhIzD-U",
    process.env.API_KEY || "mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ"
  );
 
  //stopping the recording
  const recording = await recorder.stop({
    roomId: roomId as string,
  });
 
  console.log('recording', recording);
 
  const { msg } = recording;
 
  if (msg === 'Stopped') {
 
    //fetching the recording
    const response = await fetch(
      'https://api.huddle01.com/api/v1/get-recordings',
      {
        headers: {
          'x-api-key': process.env.API_KEY!,
        },
      }
    );
    const data = await response.json();
 
    const { recordings } = data as { recordings: Recordings[] };
 
    //return the most recent recording from the list
    return NextResponse.json({ recording: recordings[0] });
  }
 
  return NextResponse.json({recording});
}