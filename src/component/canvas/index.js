import React, { useReducer, useState, useEffect } from "react";
import "./styles.scss";
import {
    UPDATE_FORM,
    onInputChange,
    onFocusOut,
    validateInput,
} from "../../lib/formUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import SharedButton from "../button";
import { types } from '../../actions/types';


/**
 * The initial state of the form
 * value: stores the value of the input field
 * touched: indicates whether the user has tried to input anything in the field
 * hasError: determines whether the field has error.
 *           Defaulted to true since all fields are mandatory and are empty on page load.
 * error: stores the error message
 * isFormValid: Stores the validity of the form at any given time.
 */
const initialState = {
    money: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
};

/**
 * Reducer which will perform form state update
 */
const formsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FORM:
            const {
                name,
                value,
                hasError,
                error,
                touched,
                isFormValid,
            } = action.data;
            return {
                ...state,
                // update the state of the particular field,
                // by retaining the state of other fields
                [name]: { ...state[name], value, hasError, error, touched },
                isFormValid,
            };
        default:
            return state;
    }
};

const Canvas = ({title, rate}) => {
    const [formState, dispatch] = useReducer(formsReducer, initialState);

    const [showError, setShowError] = useState(false);
    const [walletMoney, setWalletMoney] = useState(0);

    useEffect(() => {
        setWalletMoney(rate);
    }, [rate])

    const checkSubtractCondition = (num) => {
        if(walletMoney - num < 0) {
            dispatch({
                type: UPDATE_FORM,
                data: {
                    name: 'money',
                    value: '',
                    hasError: true,
                    error: 'You can not go negative',
                    touched: true,
                    isFormValid: true,
                },
            });
        }
        else {
            setWalletMoney(walletMoney - num)
        }
    }
    const formSubmitHandler = (e, operand) => {
        e.preventDefault(); //prevents the form from submitting

        let isFormValid = true;

        for (const name in formState) {
            const item = formState[name];
            const { value } = item;
            const { hasError, error } = validateInput(name, value);
            if (hasError) {
                isFormValid = false;
            }
            if (name) {
                dispatch({
                    type: UPDATE_FORM,
                    data: {
                        name,
                        value,
                        hasError,
                        error,
                        touched: true,
                        isFormValid,
                    },
                });
            }
        }
        if (!isFormValid) {
            setShowError(true);
        } else {
            // Here we can submit the updated money to backend...
            const {value} = formState.money;
            const num = Number(value.replace(/[\$,]/g, ''));

            switch(operand) {
                case types.SUBTRACT_MONEY: checkSubtractCondition(num); break;
                case types.ADD_MONEY: setWalletMoney(walletMoney + num); break;
                default: setWalletMoney(rate); break;
            }

        }

        // Hide the error message after 5 seconds
        setTimeout(() => {
            setShowError(false);
        }, 5000);
    };

    if(!title) {
        return null;
    }

    return (
        <div className="Canvas">
            <h1 className="title">Show me your money!!!</h1>
            {showError && !formState.isFormValid && (
                <div className="form_error">Please update your money</div>
            )}
            <form>
                <div className="input_wrapper">
                    <label htmlFor="money">You have: {title} {walletMoney}</label>
                    <input
                        type="text"
                        name="money"
                        id="money"
                        value={formState.money.value}
                        onChange={(e) => {
                            onInputChange("money", e.target.value, dispatch, formState);
                        }}
                        onBlur={(e) => {
                            onFocusOut("money", e.target.value, dispatch, formState);
                        }}
                    />
                    {formState.money.touched && formState.money.hasError && (
                        <div className="error">{formState.money.error}</div>
                    )}
                </div>
                <div className="input_wrapper">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <SharedButton className="submit_btn" type='button' buttonText='ADD' emitEvent={(event) => formSubmitHandler(event, types.ADD_MONEY)} />
                        <SharedButton className="submit_btn" type='button' buttonText='SUBTRACT' emitEvent={(event) => formSubmitHandler(event, types.SUBTRACT_MONEY)} />
                    </div>
                </div>
            </form>
        </div>
    );
}

Canvas.propTypes = {
    title: PropTypes.string,
    rate: PropTypes.number
};

const mapStateToProps = state => {
    return {
        wallet: state.wallet
    }
};

export default connect(mapStateToProps, null )(Canvas);
