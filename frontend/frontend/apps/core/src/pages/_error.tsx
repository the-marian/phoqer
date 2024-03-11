import { FC } from 'react';

const ErrorPage: FC = props => {
    // Log the error description
    console.dir(props);

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default ErrorPage;
