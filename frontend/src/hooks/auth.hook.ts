import { useContext } from 'react';

import { Auth } from '../components/context/auth/auth-context';
import { IAuth } from '../interfaces';

const useAuth = (): IAuth | null => {
    const [value] = useContext(Auth);
    return value;
};

export default useAuth;
