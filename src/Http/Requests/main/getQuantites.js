import { axiosClient } from "../../axiosClient";

export async function  getQuantities(location){
    try {
        const response = await axiosClient(`api/quantities/${location}`);
        return response.data ;
    } catch (error) {
        console.log(error.response.data)
    }
}