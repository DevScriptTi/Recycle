import { axiosClient } from "../../axiosClient";

export async function  getDemande(location){
    try {
        const response = await axiosClient(`api/demands/${location}`);
        return response.data ;
    } catch (error) {
        console.log(error.response.data)
    }
}