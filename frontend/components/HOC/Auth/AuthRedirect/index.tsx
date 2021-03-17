import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import { IState } from '../../../../interfaces';

interface IProps {
    path?: string;
    reverse?: boolean;
}

const AuthRedirect = ({ path, reverse = false }: IProps): null => {
    const history = useRouter();
    const token = useSelector<IState, string | null>(state => state.auth.access_token);

    useEffect(() => {
        if (reverse ? token : !token) {
            history.replace(path || routes.auth.login);
        }
    }, [token]);

    return null;
};

export default AuthRedirect;
