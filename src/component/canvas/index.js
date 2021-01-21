import React from 'react';
import PropTypes from 'prop-types';

const Canvas = ({title, rate}) => {

    if(!title) {
        return null;
    }

    return (
        <div data-test='canvasComponent'>
            <h4 data-test='componentTitle'>{title}</h4>
            <h4 data-test='componentRate'>{rate}</h4>
        </div>
    )
};

Canvas.propTypes = {
    title: PropTypes.string,
    rate: PropTypes.number
};

export default Canvas;
