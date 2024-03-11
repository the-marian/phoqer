import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Text } from 'src/design-system/foundation';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';
import { Offer } from 'src/types';

import { Card } from './card';
import { CardLoader } from './card-loader';
import jsonData from './card.mock.json';

const meta: Meta<typeof Card> = {
    title: 'Templates/Card',
    component: Card,
};

export default meta;

export const Base = () => {
    const [state, setState] = useState<string | null>(null);

    return (
        <Wrapper title="Card">
            <Grid size={{ base: 1, sm: 2, md: 3 }}>
                {jsonData.map(order => (
                    <GridItem key={order.id}>
                        <Card
                            value={order as unknown as Offer}
                            isActive={order.id === state}
                            onClick={() => setState(order.id === state ? null : order.id)}
                        >
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium asperiores dolores doloribus
                                eligendi ex facilis id illo incidunt iusto libero, necessitatibus non ratione repellendus unde
                                voluptatum. Amet culpa ea rerum.
                            </Text>
                        </Card>
                    </GridItem>
                ))}

                <GridItem>
                    <CardLoader showStatus />
                </GridItem>

                <GridItem>
                    <CardLoader />
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
