import { Meta } from '@storybook/react';
import { Heading, Text } from 'src/design-system/foundation';
import { Flex } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { StatusBadge } from './status-badge';

const meta: Meta<typeof StatusBadge> = {
    title: 'Data Display/StatusBadge',
    component: StatusBadge,
};

export default meta;

const status = ['pending', 'accepted', 'in_progress', 'rejected', 'done'];

export const Base = () => (
    <Wrapper title="Order Status">
        <Heading as="h2" style={{ margin: '2rem 0' }}>
            Order Status Icon
        </Heading>
        <Flex align="center" justify="space-between">
            {status.map(s => (
                <StatusBadge key={s} status={s} />
            ))}
        </Flex>

        <Heading as="h2" style={{ margin: '5rem 0 2rem' }}>
            Order Status Text
        </Heading>
        <Flex align="center" justify="space-between">
            {status.map(s => (
                <StatusBadge key={s} status={s} type="text" />
            ))}
        </Flex>

        <Heading as="h2" style={{ margin: '5rem 0 2rem' }}>
            Status Locales
        </Heading>
        <Text as="pre">
            {JSON.stringify(
                {
                    Done: 'Done',
                    Rejected: 'Rejected',
                    Pending: 'Pending',
                    Accepted: 'Accepted',
                    Progress: 'Progress',
                    Active: 'Active',
                    Disabled: 'Disabled',
                },
                null,
                3,
            )}
        </Text>
    </Wrapper>
);
