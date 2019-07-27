import React from 'react';

const Success = () => (
    <React.Fragment>
        <i className="material-icons success">check_circle</i>
        <h1>trashmash submitted</h1>
        <p>god help us all</p>
    </React.Fragment>
);

const Error = () => (
    <React.Fragment>
        <i className="material-icons error">error</i>
        <h1>something went wrong</h1>
        <p>go ping fluxe about it</p>
    </React.Fragment>
);

export const Result = (props) => {
    console.log(props.response);
    if (props.response.success) {
        return <Success />;
    } else {
        console.log(props.response.error);
        return <Error />;
    }
}