import { Meta } from '@storybook/react';
import { FolderIcon, ListIcon, PlusIcon } from 'src/design-system/icons';
import { Wrapper } from 'src/storybook/wrapper';

import { List, ListButtonItem, ListLinkItem } from './list';

const meta: Meta<typeof List> = {
    title: 'Data Display/Lists',
    component: List,
};

export default meta;

export const Base = () => (
    <Wrapper title="List">
        <List style={{ maxWidth: '400px' }}>
            <ListLinkItem icon={<PlusIcon />} href="/">
                Create new offer
            </ListLinkItem>

            <ListLinkItem icon={<PlusIcon />} href="/">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi, delectus, deserunt earum eligendi
                molestiae nam natus nisi pariatur quisquam repellat saepe sit soluta tempora temporibus voluptatum! Amet
                asperiores cupiditate dolor ea eaque ex excepturi exercitationem fuga id illum ipsam itaque labore, mollitia
                nesciunt nisi non numquam odio odit omnis perferendis quasi reprehenderit rerum, sunt tempore unde velit voluptas
                voluptates. Ab accusamus alias dolore ea facilis iusto quibusdam saepe soluta voluptas voluptatibus? Molestiae,
                quia, rem? Accusantium architecto autem debitis ea ipsa perspiciatis quia, sint sit voluptatibus voluptatum!
                Eligendi eos ipsum itaque omnis perferendis quis recusandae tempore. Eos, esse, libero?
            </ListLinkItem>

            <ListButtonItem icon={<FolderIcon />}>Rent requests</ListButtonItem>

            <ListButtonItem active icon={<ListIcon />}>
                Your offers
            </ListButtonItem>

            <ListButtonItem icon={<ListIcon />}>Your offers</ListButtonItem>
        </List>
    </Wrapper>
);
