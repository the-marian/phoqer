import { useRouter } from 'next/router';
import { useEffect } from 'react';

import router from '../../../../assets/router';
import useAuth from '../../../../hooks/auth.hook';

interface IProps {
    path?: string;
    reverse?: boolean;
}

const AuthRedirect = ({ path, reverse = false }: IProps): null => {
    const history = useRouter();
    const auth = useAuth();

    useEffect(() => {
        if (reverse ? auth?.auth_token : !auth?.auth_token) {
            history.replace(path || router.root);
        }
    }, [auth?.auth_token]);

    return null;
};

export default AuthRedirect;
