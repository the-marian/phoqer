import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Grid, GridItem, SegmentedControlItem, SegmentedControlList } from 'src/design-system';
import { GridIcon, OptionsIcon, SearchIcon } from 'src/design-system/icons';
import { Wrapper } from 'src/storybook/wrapper';

const meta: Meta<typeof SegmentedControlList> = {
    title: 'Navigation/Segments',
    component: SegmentedControlList,
};

export default meta;

const defaultValue = { one: false, two: false, three: false };

export const Base = () => {
    const [active, setActive] = useState({ ...defaultValue });
    const toggle = (key: keyof typeof defaultValue) => () => {
        setActive({ ...defaultValue, [key]: true });
    };

    return (
        <Wrapper title="Offer Card">
            <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                <GridItem>
                    <SegmentedControlList>
                        <SegmentedControlItem isActive={active.one}>
                            <button onClick={toggle('one')}>List</button>
                        </SegmentedControlItem>
                        <SegmentedControlItem isActive={active.two}>
                            <button onClick={toggle('two')}>List</button>
                        </SegmentedControlItem>
                        <SegmentedControlItem isActive={active.three}>
                            <button onClick={toggle('three')}>List</button>
                        </SegmentedControlItem>
                    </SegmentedControlList>
                </GridItem>
                <GridItem>
                    <SegmentedControlList>
                        <SegmentedControlItem>
                            <button>List</button>
                        </SegmentedControlItem>
                        <SegmentedControlItem isActive>
                            <button>Active</button>
                        </SegmentedControlItem>
                        <SegmentedControlItem>
                            <button>Not active</button>
                        </SegmentedControlItem>
                    </SegmentedControlList>
                </GridItem>
                <GridItem>
                    <SegmentedControlList>
                        <SegmentedControlItem isActive={active.one} lefIcon={<GridIcon />}>
                            <button className="icon" onClick={toggle('one')}>
                                <p>Icons</p>
                            </button>
                        </SegmentedControlItem>
                        <SegmentedControlItem isActive={active.two} lefIcon={<OptionsIcon />}>
                            <button className="icon" onClick={toggle('two')}>
                                <p>Icons</p>
                            </button>
                        </SegmentedControlItem>
                        <SegmentedControlItem isActive={active.three} rightIcon={<SearchIcon />}>
                            <button className="icon" onClick={toggle('three')}>
                                <p>Icons</p>
                            </button>
                        </SegmentedControlItem>
                    </SegmentedControlList>
                </GridItem>
                <GridItem>
                    <SegmentedControlList>
                        <SegmentedControlItem>
                            <button>
                                <GridIcon />
                            </button>
                        </SegmentedControlItem>
                        <SegmentedControlItem>
                            <button>
                                <OptionsIcon />
                            </button>
                        </SegmentedControlItem>
                        <SegmentedControlItem>
                            <button>
                                <SearchIcon />
                            </button>
                        </SegmentedControlItem>
                    </SegmentedControlList>
                </GridItem>
                <GridItem>
                    <SegmentedControlList>
                        <SegmentedControlItem>
                            <button>List</button>
                        </SegmentedControlItem>
                        <SegmentedControlItem isDisabled>
                            <button>Disabled</button>
                        </SegmentedControlItem>
                        <SegmentedControlItem isDisabled>
                            <button>Disabled</button>
                        </SegmentedControlItem>
                    </SegmentedControlList>
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
