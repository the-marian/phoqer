import { FC } from 'react';

import { Appear } from 'phoqer-shared';

import { TableBody } from '@app/components/pages/favorite/desktop/table-body/table-body';
import { TableHeader } from '@app/components/pages/favorite/desktop/table-header/table-header';
import css from '@app/components/pages/favorite/shared/styles.module.scss';

const Desktop: FC = () => {
    return (
        <Appear timeout={100} className={css.root}>
            <TableHeader />
            <TableBody />
        </Appear>
    );
};

export default Desktop;
