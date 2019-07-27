import React from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

export const Uploading = (props) => (
    <React.Fragment>
        <h1>uploading</h1>
        <Progress theme={{active: {symbol: '🗑️', color: '#40c4ff'}}} percent={props.progress} />
    </React.Fragment>
);