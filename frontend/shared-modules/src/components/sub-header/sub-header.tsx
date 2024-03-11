import { FC, ReactNode } from 'react';

import { Container, IconButton, Button, Grid3x3Icon, ChevronLeftIcon, Flex } from 'phoqer';

import css from './sub-header.module.scss';

interface Props {
    onHome?: () => void;
    onBack?: () => void;
    children?: ReactNode;
    backLabel?: string;
    className?: string;
}
export const SubHeader: FC<Props> = ({ onHome, onBack, backLabel = 'Back', className, children }) => {
    return (
        <Container size="lg" className={css.container}>
            {onHome && (
                <IconButton isFilled label="Home" onClick={onHome}>
                    <Grid3x3Icon className={css.icon} />
                </IconButton>
            )}
            {onBack && (
                <Button variant="text" size="sm" leftIcon={<ChevronLeftIcon />} onClick={onBack}>
                    {backLabel}
                </Button>
            )}
            {children && (
                <Flex align="center" className={className}>
                    {children}
                </Flex>
            )}
        </Container>
    );
};
