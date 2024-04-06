"use server";
import { prisma } from "@/lib/prisma";

export async function checkIfExists(recordingId: string) {
    try {
        const magicRecaps = await prisma.magicRecaps.findFirstOrThrow({
            where: {
                recordingId
            }
        });
        return magicRecaps;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const SummarizeText = async (textpp: string) => {
    try {
        const prompt = "Your task is to summarize the text and respond with only summarized text, no greetings or explanations. Follow strictly. Here's the content: " +  textpp;

        const response = await fetch('https://api.edenai.run/v2/text/chat', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWYzNjBhMmItZjMwMy00OWRiLWI0NzItMTE0OWViODc5ZDE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.0wtKIJwjt9mcr9B_uhCtjwzCCx-DLWtA6BzQO419RMY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                providers: "openai",
                text: prompt,
                chatbot_global_action: "Act as an assistant",
                previous_history: [],
                temperature: 0.3,
                max_tokens: 2000,
            }),
        });

        const data = await response.json();
        console.log(data)
        console.log(data['openai']['generated_text']);

        return data['openai']['generated_text'];

    } catch (error) {
        console.log(error);
    }
    return null;
}


const ConclusionText = async (textpp: string) => {
    try {
        const prompt = "Your task is to  write very short 1 (one)  liner headline/slogan/catchy-line conclusion on given text, no greetings or any long  explanations, No replies just one liner short text. Follow strictly. Here's the content: " +  textpp;

        const response = await fetch('https://api.edenai.run/v2/text/chat', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWYzNjBhMmItZjMwMy00OWRiLWI0NzItMTE0OWViODc5ZDE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.0wtKIJwjt9mcr9B_uhCtjwzCCx-DLWtA6BzQO419RMY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                providers: "openai",
                text: prompt,
                chatbot_global_action: "Act as an assistant",
                previous_history: [],
                temperature: 0.3,
                max_tokens: 2000,
            }),
        });

        const data = await response.json();
        console.log(data)
        console.log(data['openai']['generated_text']);

        return data['openai']['generated_text'];

    } catch (error) {
        console.log(error);
    }
    return null;
}



const ProcessAudio = async (recoringLink: string, recordingId: string) => {
    try {
        const response = await fetch('https://api.edenai.run/v2/audio/speech_to_text_async', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWYzNjBhMmItZjMwMy00OWRiLWI0NzItMTE0OWViODc5ZDE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.0wtKIJwjt9mcr9B_uhCtjwzCCx-DLWtA6BzQO419RMY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                providers: 'openai',
                language: 'en',
                file_url: recoringLink,
            }),
        });

        const data = await response.json();
        const publicId = data?.public_id;
        const text = data.results['openai']['text'];
        console.log(data)
        console.log(data.results['openai']['text']);


        // Generate content summary 
        const generated_text = await SummarizeText(text);

        // Write one liner content summary 
        const short_conclusion = await ConclusionText(generated_text);


        const createRecording = await prisma.magicRecaps.create({
            data: {
                recordingId,
                publicId,
                text,
                generated_text,
                short_conclusion
            },
        });
        const rec_id = createRecording?.id;
        return rec_id;

    } catch (error) {
        console.log(error);
    }
    return null;
};

export default ProcessAudio;