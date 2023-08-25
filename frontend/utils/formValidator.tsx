import isGithubUrl from "is-github-url";
import { IFormValues } from "../hooks/submit";
type FormValue = {
    required?: string;
    maxLength?: {
        value: number;
        message: string;
    };
    validate?: {
        fileType?: (fileList: FileList) => boolean | string;
        fileSize?: (fileList: FileList) => boolean | string;
        isGithub?: (url: string) => boolean | string;
    }
};
type FormValues = {
    [key in keyof IFormValues]: FormValue;
};

const validNumber = (inputtxt: string) => {
    var letters = /^[eE0-9]+$/;
    if (inputtxt.length === 0) {
        return true;
    } else if (inputtxt.match(letters) && inputtxt.length <= 100) {
        return true;
    } else {
        return "Invalid Number";
    }
};

const formVal: FormValues = {
    submitName: {
        required: "This field is requied.",
        maxLength: {
            value: 20,
            message: "Submission name should be less then 20 charaters",
        },
    },
    modelURL: {
        validate: {
            isGithub: (url: string) =>
                !url || isGithubUrl(url) ? true : "Invalid Github URL",
        },
    },
    modelDesc: {
        required: "This field is required",
        maxLength: {
            value: 300,
            message: "Submission name should not excced 300 charaters",
        },
    },
    // file: {
    //     required: "No file selected",
    //     validate: {
    //         fileType: (fileList: FileList) =>
    //             (fileList[0].type === "application/zip" || fileList[0].type === "application/x-zip-compressed" || fileList[0].type === "application/x-zip")
    //                 ? true
    //                 : "Wrong file format",
    //         fileSize: (fileList: FileList) =>
    //             fileList[0]?.size < 50 * 1024 * 1024 ? true : "File too large",
    //     },
    // },
};

export { formVal };