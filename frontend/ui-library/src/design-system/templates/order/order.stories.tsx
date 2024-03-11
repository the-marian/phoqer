import { Meta } from '@storybook/react';
import { OpenIcon } from 'src/design-system/icons';
import { Option } from 'src/design-system/inputs';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';
import { Order } from 'src/types';

import { OrderInfo, OrderCard, OrderTimer, OrderOptions } from './order';
import { OrderLoader } from './order-loader';
import orders from './order.mock.json';

const meta: Meta<typeof OrderCard> = {
    title: 'Templates/Order',
    component: OrderCard,
};

export default meta;

const Options = () => {
    return (
        <OrderOptions>
            <Option size="sm" leftIcon={<OpenIcon />}>
                Open offer
            </Option>
            <Option size="sm" leftIcon={<OpenIcon />}>
                Open chats
            </Option>
            <Option size="sm">Start rent</Option>
        </OrderOptions>
    );
};

export const Base = () => {
    return (
        <Wrapper title="Order counters">
            <Grid size={{ base: 1, sm: 2, md: 3 }}>
                {(orders as unknown as Order[]).map(item => (
                    <GridItem key={item.id}>
                        <OrderCard order={item} options={<Options />}>
                            {item.startDate ? (
                                <OrderTimer order={item} label="start time" />
                            ) : (
                                <OrderInfo order={item} label="Hello world" />
                            )}
                        </OrderCard>
                    </GridItem>
                ))}

                {[...Array(4)].map((_, index) => (
                    <GridItem key={index}>
                        <OrderLoader />
                    </GridItem>
                ))}
            </Grid>
        </Wrapper>
    );
};
