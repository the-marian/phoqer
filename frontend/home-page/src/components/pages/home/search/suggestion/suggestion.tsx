import { FC, ReactNode } from 'react';

import { Flex, Container } from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { routes } from '@app/utils/routes';

import css from './suggestion.module.scss';

interface Props {
    title: ReactNode;
    list: string[];
}
export const Suggestion: FC<Props> = ({ title, list }) => {
    return (
        <Container size="md" className={css.root}>
            <Flex className={css.header} align="center" justify="space-between">
                {title}
            </Flex>

            <Flex as="ul" className={css.list}>
                {list.map(item => (
                    <li className={css.item} key={item}>
                        <Link variant="link" size="sm" href={routes.search({ query: item })} className={css.link}>
                            {item}
                        </Link>
                    </li>
                ))}
            </Flex>
        </Container>
    );
};
