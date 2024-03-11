import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Image } from './image';

const meta: Meta<typeof Image> = {
    title: 'Media/Image',
    component: Image,
};

export default meta;

const styles = `<style>
td {
    width: 50%; 
}
.image {
    width: 100%;
    height: 40rem;
}
</style>`;

export const Base = () => (
    <Wrapper title="Image" styles={styles}>
        <Grid size={{ base: 1, md: 3 }}>
            <GridItem>
                <Image
                    className="image"
                    src="https://unsplash.com/photos/lhDjusLtpP4/download?ixid=MnwxMjA3fDF8MXxhbGx8MXx8fHx8fDJ8fDE2NTE5MzU2Njk&force=true"
                    alt="large image"
                />
            </GridItem>
            <GridItem>
                <Image className="image" src="broken-url" />
            </GridItem>
        </Grid>
    </Wrapper>
);
