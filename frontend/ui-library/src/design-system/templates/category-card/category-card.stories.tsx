import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { CategoryCard } from './category-card';

const meta: Meta<typeof CategoryCard> = {
    title: 'Templates/CategoryCard',
    component: CategoryCard,
};

export default meta;

const category = [
    {
        slug: 'clothes_and_accessories',
        title: 'Clothes and Accessories',
        emoji: '',
        description:
            'When an unknown printer took a galley of type and scrambled unknown printer took a galley of type and scrambled.',
        image: 'https://images.unsplash.com/photo-1561052967-61fc91e48d79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
    },
    {
        slug: 'tools_and_special_machinery',
        title: 'Tools and Special Machinery',
        emoji: '',
        description: 'When an unknown printer took a galley of type and scrambled.',
        image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80',
    },
    {
        slug: 'sports_and_outdoors',
        title: 'Sports and Outdoors',
        emoji: '',
        description: 'When an unknown printer took a galley of type and scrambled.',
        image: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    },
    {
        slug: 'hobby',
        title: 'Hobby',
        emoji: '',
        description: 'When an unknown printer took a galley of type and scrambled.',
        image: 'https://images.unsplash.com/photo-1505850557988-b858c0aec076?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80',
    },
    {
        slug: 'other',
        title: 'Other',
        emoji: '',
        description: 'When an unknown printer took a galley of type and scrambled.',
        image: 'https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80',
    },
];

export const Base = () => (
    <Wrapper title="Category Card">
        <Grid size={{ base: 2, sm: 3, md: 4 }}>
            {category.map(item => (
                <GridItem key={item.slug}>
                    <CategoryCard value={item} />
                </GridItem>
            ))}
        </Grid>
    </Wrapper>
);
