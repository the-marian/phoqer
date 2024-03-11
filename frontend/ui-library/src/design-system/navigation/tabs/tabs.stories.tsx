import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system';
import { GridIcon, ListIcon, SearchIcon } from 'src/design-system/icons';
import { Wrapper } from 'src/storybook/wrapper';

import { TabItem } from './tab-item';
import { TabList } from './tab-list';

const meta: Meta<typeof TabList> = {
    title: 'Navigation/Tabs',
    component: TabList,
};

export default meta;

export const Base = () => (
    <Wrapper title="Tabs">
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            Button <small>(2)</small>
                        </button>
                    </TabItem>
                    <TabItem>
                        <a href="/?path=/story/tabs--tabs">Link</a>
                    </TabItem>
                    <TabItem>
                        <button type="button">Reviews</button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            Button <small>(10)</small>
                        </button>
                    </TabItem>
                    <TabItem isDisabled>
                        <a href="/?path=/story/tabs--tabs">Link</a>
                    </TabItem>
                    <TabItem isDisabled isActive>
                        <button type="button">Reviews</button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            Button <small>(2)</small>
                        </button>
                    </TabItem>
                    <TabItem isActive>
                        <a href="/?path=/story/tabs--tabs">Link</a>
                    </TabItem>
                    <TabItem isActive>
                        <button type="button">Reviews</button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            Button <small>(2)</small>
                        </button>
                    </TabItem>
                    <TabItem isLoading>
                        <a href="/?path=/story/tabs--tabs">Link</a>
                    </TabItem>
                    <TabItem isLoading>
                        <button type="button">Reviews</button>
                    </TabItem>
                </TabList>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const WithIcon = () => (
    <Wrapper title="Tabs">
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <span>
                                Button <small>(2)</small>
                            </span>
                        </button>
                    </TabItem>
                    <TabItem>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                            <span>Link</span>
                        </a>
                    </TabItem>
                    <TabItem>
                        <button type="button">
                            <ListIcon />
                            <span>Reviews</span>
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <span>
                                Button <small>(2)</small>
                            </span>
                        </button>
                    </TabItem>
                    <TabItem isDisabled>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                            <span>Link</span>
                        </a>
                    </TabItem>
                    <TabItem isDisabled>
                        <button type="button">
                            <ListIcon />
                            <span>Reviews</span>
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <span>
                                Button <small>(2)</small>
                            </span>
                        </button>
                    </TabItem>
                    <TabItem isActive>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                            <span>Link</span>
                        </a>
                    </TabItem>
                    <TabItem isActive>
                        <button type="button">
                            <ListIcon />
                            <span>Reviews</span>
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <span>
                                Button <small>(2)</small>
                            </span>
                        </button>
                    </TabItem>
                    <TabItem isLoading>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                            <span>Link</span>
                        </a>
                    </TabItem>
                    <TabItem isLoading>
                        <button type="button">
                            <ListIcon />
                            <span>Reviews</span>
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const OnlyIcon = () => (
    <Wrapper title="Tabs">
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <small>(2)</small>
                        </button>
                    </TabItem>
                    <TabItem>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                        </a>
                    </TabItem>
                    <TabItem>
                        <button type="button">
                            <ListIcon />
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <small>(2)</small>
                        </button>
                    </TabItem>
                    <TabItem isDisabled>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                        </a>
                    </TabItem>
                    <TabItem isDisabled>
                        <button type="button">
                            <ListIcon />
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <small>(2)</small>
                        </button>
                    </TabItem>
                    <TabItem isActive>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                        </a>
                    </TabItem>
                    <TabItem isActive>
                        <button type="button">
                            <ListIcon />
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
            <GridItem>
                <TabList className="list">
                    <TabItem>
                        <button type="button">
                            <GridIcon />
                            <small>(2)</small>
                        </button>
                    </TabItem>
                    <TabItem isLoading>
                        <a href="/?path=/story/tabs--tabs">
                            <SearchIcon />
                        </a>
                    </TabItem>
                    <TabItem isLoading>
                        <button type="button">
                            <ListIcon />
                        </button>
                    </TabItem>
                </TabList>
            </GridItem>
        </Grid>
    </Wrapper>
);
