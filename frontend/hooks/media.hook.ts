import { useContext } from 'react';

import { Media } from '../components/context/media';

const useMedia = (width: number): boolean => {
    const [media] = useContext(Media);
    return width < media;
};

export default useMedia;
