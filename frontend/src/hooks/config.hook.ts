import { useContext } from 'react';

import { Config, IConfigValue } from '../components/context/config';

const useConfig = (): IConfigValue => useContext(Config);

export default useConfig;
