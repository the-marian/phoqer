import { FC, useRef } from 'react';

import { SlideFade, SlideFadeProps } from '@chakra-ui/react';
import { useInView } from 'framer-motion';

type Props = SlideFadeProps;
export const SlideInView: FC<Props> = props => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: '0px', once: true });

    return (
        <SlideFade
            ref={ref}
            in={isInView}
            offsetY="15%"
            style={{ height: '100%', width: '100%' }}
            transition={{ enter: { duration: 0.5, delay: 0.2 } }}
            {...props}
        />
    );
};
