import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { IState } from '../../../../interfaces';
import routes from '../../../../utils/routes';

interface IProps {
    path?: string;
    reverse?: boolean;
}

const AuthRedirect = ({ path, reverse = false }: IProps): null => {
    const history = useRouter();
    const token = useSelector<IState, string | null>(state => state.auth.access_token);

    useEffect(() => {
        if (reverse ? token : !token) {
            history.replace(path || routes.root);
        }
    }, [history, path, reverse, token]);

    return null;
};

export default AuthRedirect;
