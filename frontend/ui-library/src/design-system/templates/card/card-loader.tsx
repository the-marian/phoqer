import { FC } from 'react';

import { Skeleton } from 'src/design-system/feedback';
import { ChevronRightIcon } from 'src/design-system/icons';
import { Flex } from 'src/design-system/layout';

import css from './card.module.scss';

interface Props {
    showStatus?: boolean;
}
export const CardLoader: FC<Props> = ({ showStatus = false }) => {
    return (
        <div className={css.root}>
            <div className={css.button}>
                <Flex align="center" justify="space-between" wrap="nowrap" className={css.inner}>
                    <Skeleton style={{ height: '10rem' }} className={css.image} />

                    <Flex align="flex-start" justify="space-between" direction="column" className={css.content}>
                        <Skeleton style={{ height: '2rem', width: '70%' }} />

                        <Flex align="center" style={{ width: '100%', margin: '1rem 0' }}>
                            {showStatus && (
                                <Skeleton
                                    color="blue"
                                    className={css.status}
                                    style={{ height: '3rem', width: '3rem', borderRadius: '50%' }}
                                />
                            )}

                            <Skeleton style={{ height: '1.6rem', width: '40%' }} />
                        </Flex>

                        <Flex align="center" justify="flex-start" style={{ width: '100%' }}>
                            <Skeleton style={{ height: '1.6rem', width: '35%' }} />
                        </Flex>
                    </Flex>

                    <Flex align="center" justify="center" className={css.marker}>
                        <ChevronRightIcon />
                    </Flex>
                </Flex>
            </div>
        </div>
    );
};
