import Link from "next/link";
import { BACKEND_URL } from "../../hooks/instance";
import { BaseSyntheticEvent, useState } from "react";
import { Path, useForm, UseFormRegister, SubmitHandler, FieldErrors } from "react-hook-form";
import { IFormValues, postSubmit } from "../../hooks/submit";

const defaultValues: IFormValues = {
    submitName: "",
    modelURL: "",
    modelDesc: "",
}

type InputSetting = {
    required: boolean;
    name: string;
};

type InputSettings = {
    [key in keyof IFormValues]: InputSetting;
};

const inputSettings: InputSettings = {
    submitName: {
        required: true,
        name: "Submission Name*",
    },
    modelURL: {
        required: false,
        name: "Model URL/Github",
    },
    modelDesc: {
        required: true,
        name: "Model Description*",
    },
}

type InputProps = {
    label: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    required: boolean;
    name: string;
    errors: FieldErrors<IFormValues>
};

// The following component is an example of your existing Input Component
const Input = ({ label, register, required, name, errors }: InputProps) => {
    return <div className="w-full">
        <div className={`relative ${errors[label] ? "!text-red-500" : ""}`}>
            <input
                id={label}
                {...register(label, { required })}
                type="text"
                className={`md-input h-8 outline-none w-full ${errors[label] ? "!text-red-500" : ""}`}
                placeholder=""
            />
            <label htmlFor={label} className={`md-label ${errors[label] ? "!text-red-500" : ""}`}>{name}</label>
            <div className={`md-input-underline border-t-transparent ${errors[label] ? "border-b-red-500" : "border-b-gray-400"}`} />
        </div>
    </div>
};

const LoginSubmit = ({ token }: { token: string }) => {
    const [formState, setFormState] = useState(false);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch } = useForm<IFormValues>({
            defaultValues
        });
    const submitHandler: SubmitHandler<IFormValues> = async (data: IFormValues) => {
        try {
            setFormState(true);
            const response = await postSubmit(data, token);
            if (response.status == 200) {
                setFormState(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return <div className="font-light">
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
                        const inputKey = key as keyof IFormValues; // Type assertion
                        const { name, required } = inputSettings[inputKey];
                        return <Input key={key} label={inputKey} register={register}
                            required={required} name={name} errors={errors} />;
                    })
                }

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

            </form>
        </div>
    </div>
}

export default LoginSubmit;
