import { FC } from 'react';

import { Text, Heading } from 'src/design-system/foundation';
import { Container } from 'src/design-system/layout';
import { Image } from 'src/design-system/media/image/image';

import css from './about.module.scss';

export interface AboutProps {
    src: string;
    description: string;
}
export const About: FC<AboutProps> = ({ src, description }) => {
    return (
        <section className={css.root}>
            <Container>
                <Image className={css.img} src={src} alt="Phoqer" />
            </Container>
            <Container size="md">
                <Heading as="h2" className={css.title}>
                    PHOQER
                </Heading>
                <Text className={css.description}>{description}</Text>
            </Container>
        </section>
    );
};
