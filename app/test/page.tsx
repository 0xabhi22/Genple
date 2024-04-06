"use client";
import { Button } from "@/components/ui/button";

const API_KEY = "mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ";

const MainPage = () => {
    const handleFetch = async () => {
        try {
            const response = await fetch("https://api.huddle01.com/api/v1/get-recordings", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
              },
            });
        
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
            }
        
            const data = await response.json();
            console.log(data);
            return data;
          } catch (error) {
            console.error("Error fetching recordings:", error);
            return null; 
          }
    }

    return ( 
        <>
        <Button onClick={handleFetch}>Fetch</Button>
        </>
     );
}
 
export default MainPage;