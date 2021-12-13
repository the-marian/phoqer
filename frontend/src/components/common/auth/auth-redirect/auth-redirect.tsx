import React, { ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useAuth from '../../../../hooks/auth.hook';
import routes from '../../../../utils/routes';

interface IProps {
    path?: string;
    reverse?: boolean;
    children: ReactNode;
}

const AuthRedirect = ({ children, reverse = false, path = routes.root }: IProps): JSX.Element => {
    const history = useRouter();
    const { token } = useAuth();
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        const redirect = reverse ? token.access_token : !token.access_token;
        if (redirect) {
            history.replace(path);
        } else {
            setHidden(false);
        }
    }, [history, path, reverse, token]);

    return <>{hidden ? null : children}</>;
};

export default AuthRedirect;
