import axios from "./instance";
import { useForm, SubmitHandler } from "react-hook-form";

export interface IFormValues {
    submitName: string,
    modelDesc: string,
    modelURL: string,
    file: FileList,
}

export const postSubmit = async (submission: FormData, token: string) => await
    axios.post("/api/submission", submission, { headers: { 'Authorization': 'Bearer ' + token } });



