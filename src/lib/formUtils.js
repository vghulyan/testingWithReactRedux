export const UPDATE_FORM = "UPDATE_FORM";

/**
 * Triggered every time the value of the form changes
 */
export const onInputChange = (name, value, dispatch, formState) => {
    const { hasError, error } = validateInput(name, value);
    let isFormValid = true;

    for (const key in formState) {
        const item = formState[key];
        // Check if the current field has error
        if (key === name && hasError) {
            isFormValid = false;
            break;
        } else if (key !== name && item.hasError) {
            // Check if any other field has error
            isFormValid = false;
            break;
        }
    }

    dispatch({
        type: UPDATE_FORM,
        data: { name, value, hasError, error, touched: false, isFormValid },
    });
};

export const validateInput = (name, value) => {
    let hasError = false,
        error = "";
    switch (name) {
        case "money":
            if (value.trim() === "") {
                hasError = true;
                error = "Money field cannot be empty";
            } else if(value.search(/^\$?[\d,]+(\.\d*)?$/) < 0) {
                hasError = true;
                error = "Invalid Money.";
            }
            else {
                hasError = false;
                error = "";
            }
            break;
        default:
            break;
    }
    return { hasError, error };
};

export const onFocusOut = (name, value, dispatch, formState) => {
    const { hasError, error } = validateInput(name, value);
    let isFormValid = true;
    for (const key in formState) {
        const item = formState[key];
        if (key === name && hasError) {
            isFormValid = false;
            break;
        } else if (key !== name && item.hasError) {
            isFormValid = false;
            break;
        }
    }

    dispatch({
        type: UPDATE_FORM,
        data: { name, value, hasError, error, touched: true, isFormValid },
    });
};
