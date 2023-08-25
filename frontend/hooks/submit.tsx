import axios from "./instance";
import { useForm, SubmitHandler } from "react-hook-form";

export interface IFormValues {
    submitName: string,
    modelDesc: string,
    modelURL: string,
}
export const postSubmit = async (submission: IFormValues, token: string) => await
    axios.post("/api/submission", submission, { headers: { 'Authorization': 'Bearer ' + token } });



