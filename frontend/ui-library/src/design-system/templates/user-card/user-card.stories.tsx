import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system';
import { Wrapper } from 'src/storybook/wrapper';

import { UserCard } from './user-card';
import { UserCardLoader } from './user-card-loader';

const meta: Meta<typeof UserCard> = {
    title: 'Templates/UserCards',
    component: UserCard,
};

export default meta;

const users = [
    {
        id: '1',
        date: 1650285347362,
        user: {
            id: '1',
            firstName: 'Denis',
            lastName: 'Korobsky',
            avatar: null,
        },
    },
    {
        id: '3',
        date: 1650285347362,
        user: {
            id: '3',
            firstName: 'Evgeny',
            lastName: 'Siroshtan',
            avatar: 'https://images.unsplash.com/photo-1649626306353-126afb2aa9a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        },
    },
    {
        id: '4',
        date: 1650285347362,
        user: {
            id: '4',
            firstName: 'Eugene',
            lastName: 'Mace',
            avatar: 'https://images.unsplash.com/photo-1649376888254-62a3abf8a907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3456&q=80',
        },
    },
];

export const Base = () => (
    <Wrapper title="User card">
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {users.map(item => (
                <GridItem key={item.id}>
                    <UserCard user={item.user} />
                </GridItem>
            ))}

            <GridItem>
                <UserCardLoader />
            </GridItem>
        </Grid>
    </Wrapper>
);
