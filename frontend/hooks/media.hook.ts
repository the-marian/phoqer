import { useContext } from 'react';

import { Media } from '../components/Context/Media';

const useMedia = (width: number): boolean => {
    const [media] = useContext(Media);
    return width < media;
};

export default useMedia;
