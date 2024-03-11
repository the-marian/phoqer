import { Meta } from '@storybook/react';
import { Button } from 'src/design-system/inputs';
import { Grid, GridItem } from 'src/design-system/layout';
import { Image } from 'src/design-system/media';
import { Wrapper } from 'src/storybook/wrapper';

import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'Feedback/Tooltip',
    component: Tooltip,
};

export default meta;

const styles = `<style>
td {
    width: 25%;
    padding: 10px;
}
.img {
    width: 20rem;
    height: 20rem;
}
</style>`;

export const Base = () => (
    <Wrapper title="Tooltip" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            <GridItem>
                <Tooltip
                    position="right"
                    label=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut deleniti deserunt dicta dolor ducimus
                            et eveniet explicabo ipsa ipsum iusto minima natus nihil nostrum officia quia saepe tempora,
                            voluptatibus?"
                >
                    <Button>Tooltip</Button>
                </Tooltip>
            </GridItem>

            <GridItem>
                <Tooltip
                    position="bottom"
                    label={
                        <Image
                            className="img"
                            src="https://images.unsplash.com/photo-1649194271420-b2ff52418a62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
                            alt=""
                        />
                    }
                >
                    <Button>Tooltip</Button>
                </Tooltip>
            </GridItem>

            <GridItem>
                <Tooltip
                    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut deleniti deserunt dicta dolor ducimus
                            et eveniet explicabo ipsa ipsum iusto minima natus nihil nostrum officia quia saepe tempora,
                            voluptatibus?"
                >
                    <Button disabled>Tooltip</Button>
                </Tooltip>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const FixedPosition = () => (
    <Wrapper title="Tooltip" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            <GridItem>
                <Tooltip
                    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut deleniti deserunt dicta dolor ducimus
                            et eveniet explicabo ipsa ipsum iusto minima natus nihil nostrum officia quia saepe tempora,
                            voluptatibus?"
                    position="right"
                >
                    <Button>Right</Button>
                </Tooltip>
            </GridItem>
            <GridItem>
                <Tooltip
                    label=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut deleniti deserunt dicta dolor ducimus
                            et eveniet explicabo ipsa ipsum iusto minima natus nihil nostrum officia quia saepe tempora,
                            voluptatibus?"
                    position="left"
                >
                    <Button>Left</Button>
                </Tooltip>
            </GridItem>
            <GridItem>
                <Tooltip
                    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut deleniti deserunt dicta dolor ducimus
                            et eveniet explicabo ipsa ipsum iusto minima natus nihil nostrum officia quia saepe tempora,
                            voluptatibus?"
                    position="top"
                >
                    <Button>Top</Button>
                </Tooltip>
            </GridItem>
            <GridItem>
                <Tooltip
                    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut deleniti deserunt dicta dolor ducimus
                            et eveniet explicabo ipsa ipsum iusto minima natus nihil nostrum officia quia saepe tempora,
                            voluptatibus?"
                    position="bottom"
                >
                    <Button>Bottom</Button>
                </Tooltip>
            </GridItem>
        </Grid>
    </Wrapper>
);
