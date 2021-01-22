import React from 'react';
import PropTypes from 'prop-types';

const SharedButton = ({buttonText, emitEvent}) => {

    const submitEvent = (e) => {
        if(emitEvent) {
            emitEvent(e);
        }
    }
    return (
        <button onClick={(e) => submitEvent(e)} data-test='buttonComponent'>
            {buttonText}
        </button>
    )
};

SharedButton.propTypes = {
    buttonText: PropTypes.string,
    emitEvent: PropTypes.func
};

export default SharedButton;
