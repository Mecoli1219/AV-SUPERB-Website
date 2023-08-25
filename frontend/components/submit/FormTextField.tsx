import { Controller } from "react-hook-form";
import { useState, FocusEvent } from "react";
import TextField from "./TextField"

const FormTextField = ({
    control,
    name,
    label,
    description,
    rules,
    error,
    helperText,
}: {
    control: any,
    name: string,
    label: string,
    description: string,
    rules: any,
    error: any,
    helperText: any,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    return < TextField
                        {...field}
                        innerRef={field.ref}
                        label={label}
                        setAnchorEl={setAnchorEl}
                        error={error}
                        helperText={helperText}
                    />
                }
                }
                rules={rules}
            />
            {/* <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="right-start"
                transition
                style={{ maxWidth: "27%" }}
            >
                <div className={classes.paper}>{description}</div>
            </Popper> */}
        </>
    );
};
export default FormTextField;