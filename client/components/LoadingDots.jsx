// @flow
import React from 'react';
import { uniqueId } from 'lodash';

type LoadingDotsType = {
    numberOfDots: number,
};

const renderDots = (numberOfDots: number) => (
    [...Array(numberOfDots)].map(i => (
        <div className="circle" key={ uniqueId(i) } />
    ))
);

const LoadingDots = (props: LoadingDotsType) => (
    <div className="loader">
        { renderDots(props.numberOfDots) }
    </div>
);

export default LoadingDots;
