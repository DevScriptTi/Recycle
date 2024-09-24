import { axiosClient } from "../../axiosClient";

export async function  getWilayas(){
    try {
        const response = await axiosClient('api/wilayas');
        return response.data ;
    } catch (error) {
        console.log(error.response.data)
    }
}