import { FC } from 'react';

const ErrorPage: FC = props => {
    console.log(props);
    return <h1>500 - Server-side error occurred</h1>;
};

export default ErrorPage;
