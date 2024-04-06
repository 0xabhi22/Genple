import { API } from '@huddle01/server-sdk/api';


const getAllrooms = async () => {
    const api = new API({
        apiKey: process.env.API_KEY || "mJMSMF-zsla04xpnFmdo1I3GUbbqaDJQ",
    });

    const rooms = await api.getRooms();

    console.log(rooms?.data);

    return rooms?.data?.rooms;
};

export default getAllrooms;