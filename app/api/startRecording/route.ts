import { NextRequest, NextResponse } from 'next/server';
import { Recorder } from '@huddle01/server-sdk/recorder';
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
 
export async function GET( request: Request ) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId'); 
  console.log(roomId);

 
  //creating the Recorder class instance
  const recorder = new Recorder(
    process.env.NEXT_PUBLIC_PROJECT_ID || "n0_pMNrjW_S6lyo0K2MwzWKVOVhIzD-U",
    process.env.API_KEY || "mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ"
  );
 
  //generating an access token for the recorder
  const token = new AccessToken({
    apiKey: process.env.API_KEY!,
    roomId: roomId as string,
    role: Role.BOT,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });
 
  const accessToken = await token.toJwt();
 
  //starting the recording
  const recording = await recorder.startRecording({
    roomId: roomId as string,
    token: accessToken,
    options: {
      audioOnly: true
    }
  });
 
  console.log('recording', recording);
 
  return NextResponse.json({recording});
}