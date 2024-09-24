import { axiosClient } from "../../axiosClient";

export async function  getSparePartCategories(){
    try {
        const response = await axiosClient('api/sparePartCategories');
        return response.data ;
    } catch (error) {
        console.log(error.response.data)
    }
}