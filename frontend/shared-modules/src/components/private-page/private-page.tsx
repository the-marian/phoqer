import { FC, ReactNode, useContext } from 'react';

import { AuthContext } from 'src/context/auth.context';

interface Props {
    reverse?: boolean;
    children: ReactNode;
    navigate: (value: string) => void;
}
export const PrivatePage: FC<Props> = ({ children, navigate, reverse = false }) => {
    const { auth, loading } = useContext(AuthContext);

    if (reverse && !loading) {
        if (auth) {
            navigate('/');
            return <></>;
        }
    }

    if (!reverse && !loading) {
        if (!auth) {
            navigate('/auth/login');
            return <></>;
        }
    }

    return <>{children}</>;
};
