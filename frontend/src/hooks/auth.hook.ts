import { useContext } from 'react';

import { Auth, AuthHook } from '../components/context/auth/auth';

const useAuth = (): AuthHook => useContext(Auth);

export default useAuth;
