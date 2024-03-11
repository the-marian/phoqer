import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
    title: 'Media/Avatars',
    component: Avatar,
};

export default meta;

const styles = `<style>
td {
    width: 30%;
}
</style>`;

export const Base = () => (
    <Wrapper title="Avatar" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            <GridItem>
                <Avatar
                    size="sm"
                    src="https://images.unsplash.com/photo-1567549361708-ff4ae2ec864c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                    alt="Eugene Mace"
                />
            </GridItem>
            <GridItem>
                <Avatar
                    alt=""
                    size="md"
                    src="https://images.unsplash.com/photo-1651867109886-dfe38b39815f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                />
            </GridItem>
            <GridItem>
                <Avatar
                    alt=""
                    size="lg"
                    src="https://images.unsplash.com/photo-1651775785114-1cb0dfd9f18c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                />
            </GridItem>
        </Grid>
    </Wrapper>
);
