import { axiosClient } from "../../axiosClient";

export async function  getPrimaryMaterCategories(){
    try {
        const response = await axiosClient('api/primaryMaterCategories');
        return response.data ;
    } catch (error) {
        console.log(error.response.data)
    }
}