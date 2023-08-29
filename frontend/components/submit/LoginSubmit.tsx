import Link from "next/link";
import { BACKEND_URL } from "../../hooks/instance";
import { BaseSyntheticEvent, useState, useRef, useEffect } from "react";
import { Path, useForm, UseFormRegister, SubmitHandler, FieldErrors, set } from "react-hook-form";
import { IFormValues, postSubmit } from "../../hooks/submit";
import { FormValue, formVal } from "../../utils/formValidator";
import { SubmitResult } from "./SubmitResult";

const defaultValues = {
    submitName: "",
    modelURL: "",
    modelDesc: "",
}

type InputSetting = {
    name: string;
    description: string
};

type InputSettings = {
    [key in keyof IFormValues]: InputSetting;
};

const inputSettings: InputSettings = {
    submitName: {
        name: "Submission Name*",
        description: "A short name for your system, which will be displayed on the leaderboard. (Required)"
    },
    modelURL: {
        name: "Model URL/Github",
        description: "A Github URL for your model code repository. (Optional)"
    },
    modelDesc: {
        name: "Model Description*",
        description: "A sentence or two describing your system. Make sure to mention any outside data you use. (Required)"
    },
    file: {
        name: "Model File*",
        description: "A zip file containing your model. (Required)"
    }
}

type InputProps = {
    label: keyof IFormValues;
    register: UseFormRegister<IFormValues>;
    name: string;
    errors: FieldErrors<IFormValues>;
    description: string;
};

// The following component is an example of your existing Input Component
const Input = ({ label, register, name, errors, description }: InputProps) => {
    return <div className="w-full">
        <div className={`relative ${errors[label] ? "!text-red-500" : ""}`}>
            <input
                id={label}
                {...register(label, formVal[label] as any)}
                type="text"
                className={`md-input h-8 outline-none w-full ${errors[label] ? "!text-red-500" : ""}`}
                placeholder=""
                // extract maxLength from formVal[label].maxLength.value
                maxLength={(formVal[label] as FormValue).maxLength?.value}
            />
            <label htmlFor={label} className={`md-label ${errors[label] ? "!text-red-500" : ""}`}>{name}</label>
            <div className="md-input-description absolute 
                w-32 -right-32 
                md:w-48 md:-right-48 
                lg:w-64 lg:-right-64 
                -top-6 hidden max-sm:!hidden ">
                <div className="text-left p-2 m-3  border">

                    {description}
                </div>
            </div>
            <div className={`md-input-underline border-t-transparent ${errors[label] ? "border-b-red-500" : "border-b-gray-400"}`} />
        </div>
        <div className="text-red-500 text-xs text-left">{errors[label] ? errors[label]?.message : " "}</div>
    </div>
};

const LoginSubmit = ({ token }: { token: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch } = useForm<IFormValues>({
            defaultValues
        });
    useEffect(() => {
        register("file", formVal.file);
    }, [register]);
    const watchFile = watch("file");
    const submitHandler: SubmitHandler<IFormValues> = async (data: IFormValues) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("submitName", data.submitName);
        formData.append("modelURL", data.modelURL);
        formData.append("modelDesc", data.modelDesc);
        formData.append("file", data?.file[0]);
        await postSubmit(data, token).then((res) => {
            setIsLoading(false);
            setSuccess(true);
            setMessage("Submission Success!");
            setShowResult(true);
        }).catch((err) => {
            if (err.response) {
                setMessage(err.response.data.message);
            } else {
                setMessage(err.message);
            }
            setSuccess(false);
            setIsLoading(false);
            setShowResult(true);
        })
    };

    return <div className="font-light">
        {
            showResult && <SubmitResult setShowResult={setShowResult} success={success} message={message} />
        }
        <div className="pt-10 text-gray-400">
            Make sure to read the <Link href="/rules" className="text-blue-400 underline cursor-pointer">Rules</Link> before
            submitting to the <Link href="/leaderboard" className="text-blue-400 underline cursor-pointer">SUPERB Benchmark</Link>.
        </div>
        <div className="pt-10 text-gray-400">
            After your submission, the row of submission will <span className="font-bold italic">only</span> appear on the Profile tab and will not appear in the leaderboard. You can select the &quot;Show&quot; button in the Profile tab to control whether to show it on leaderboard or not.
        </div>
        <div className="mt-12">
            <Link href={`${BACKEND_URL}/api/download/example`} className="text-red-500 hover:underline cursor-pointer text-sm">Sample submission file</Link>
        </div>

        <div className="w-5/6 md:w-4/5 lg:w-3/5 m-auto">
            <form className="mt-12 px-8 py-6 space-y-5 text-base w-full" onSubmit={handleSubmit(submitHandler)}>
                {
                    Object.keys(inputSettings).map((key) => {
                        if (key === "file") {
                            return
                        }
                        const inputKey = key as keyof IFormValues; // Type assertion
                        const { name, description } = inputSettings[inputKey];
                        return <Input key={key} label={inputKey} register={register}
                            name={name} errors={errors} description={description} />;
                    })
                }
                <input
                    type="file"
                    accept=".zip"
                    className="hidden"
                    name="file"
                    id="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) {
                            setValue("file", e.target.files);
                        }
                    }}
                />
                <label
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center block"
                    htmlFor="file"
                >

                    {watchFile && watchFile[0]?.name
                        ? watchFile[0]?.name
                        : "Select zip"}
                </label>
                <div className="text-red-500 text-xs text-left !mt-0">{errors.file ? errors.file?.message : " "}</div>

                <button type="submit" disabled={isLoading}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {isLoading ? "Submitting..." : success ? "Success" : "Submit"}
                </button>

            </form>
        </div>
        <div className="mt-12"></div>
    </div>
}

export default LoginSubmit;
