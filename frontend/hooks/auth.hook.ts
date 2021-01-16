import { useContext } from 'react';

import { Auth } from '../components/HOC/Auth/AuthContext';
import { IAuth } from '../interfaces';

const useAuth = (): IAuth | null => {
    const [value] = useContext(Auth);
    return value;
};

export default useAuth;
