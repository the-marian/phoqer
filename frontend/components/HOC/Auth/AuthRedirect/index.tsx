import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import router from '../../../../assets/router';
import { IState } from '../../../../interfaces';

interface IProps {
    path?: string;
    reverse?: boolean;
}

const AuthRedirect = ({ path, reverse = false }: IProps): null => {
    const history = useRouter();
    const token = useSelector<IState, string | null>(state => state.auth.auth_token);

    useEffect(() => {
        if (reverse ? token : !token) {
            history.replace(path || router.root);
        }
    }, [token]);

    return null;
};

export default AuthRedirect;
