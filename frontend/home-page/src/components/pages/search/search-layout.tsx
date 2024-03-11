import { FC, PropsWithChildren } from 'react';

import { Cell, Container, Row } from 'phoqer';

import { Filters } from './filters';
import css from './search-layout.module.scss';

export const SearchLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Container size="lg">
            <Row className={css.row}>
                <Cell size={{ base: 2, lg: 2 }}>
                    <Filters />
                </Cell>
                <Cell size={{ base: 10, lg: 10 }}>{children}</Cell>
            </Row>
        </Container>
    );
};
