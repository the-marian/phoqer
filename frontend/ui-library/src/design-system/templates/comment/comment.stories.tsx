import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Container, Flex } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Comment } from './comment';

const meta: Meta<typeof Comment> = {
    title: 'Templates/Comment',
    component: Comment,
};

export default meta;

const offers = [
    {
        id: '1',
        offerId: '1',
        description:
            'I placed an order on the site late in the evening, and the very next morning I received an SMS that the phone was already at the pickup point! Already I was pleasantly surprised by the OUTLET with efficiency, and even on a day off.',
        score: 5,
        date: 1650285347362,
        images: [
            'https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2589&q=80',
        ],
        author: {
            id: '1',
            firstName: 'Denis',
            lastName: 'Korobsky',
            avatar: null,
        },
    },
    {
        id: '2',
        offerId: '1',
        description:
            "Effectively) After switching from iPhone 7, it's just a surge of emotions! You can feel how everything has changed, the difference is colossal. https://phoqer.com/ Most likely it will not be so noticeable if you switch from newer models, but the phone is still on the level))",
        score: 4.3,
        date: 1650285347362,
        images: [],
        author: {
            id: '2',
            firstName: 'Vladislav',
            lastName: 'Mukhin',
            avatar: 'https://images.unsplash.com/photo-1567549361708-ff4ae2ec864c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        },
    },
    {
        id: '3',
        offerId: '1',
        description:
            'The device is just a bomb, probably all aspects in it are almost perfect, although the presence of lightning in 2021 is embarrassing.\n' +
            'The screen is, of course, WOW, after a couple of days of use you get used to it so quickly that when using previous models, you no longer get that buzz, and you want to quickly take a trinity. In the sun, the brightness increased significantly.\n' +
            'The color is amazing, even better in real life than in the photo. In most cases, I see it as "moderate gray", but in the sun it shimmers into blue.\n' +
            'Everything flies! All successful shopping.',
        score: 4.5,
        date: 1650285347362,
        images: [],
        author: {
            id: '3',
            firstName: 'Evgeny',
            lastName: 'Siroshtan',
            avatar: 'https://images.unsplash.com/photo-1649626306353-126afb2aa9a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        },
    },
    {
        id: '4',
        offerId: '1',
        description: 'The phone is just awesome.',
        score: 5,
        date: 1650285347362,
        images: [
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1611791484670-ce19b801d192?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2575&q=80',
        ],
        author: {
            id: '4',
            firstName: 'Eugene',
            lastName: 'Mace',
            avatar: 'https://images.unsplash.com/photo-1649376888254-62a3abf8a907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3456&q=80',
        },
    },
];

export const Base = () => {
    const [loading, setLoading] = useState(true);

    const toggle = (value: boolean) => {
        if (value) {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        } else {
            setLoading(true);
        }
    };

    return (
        <Wrapper title="Comment">
            <Flex align="center" justify="center">
                <Container size="sm">
                    <Comment value={{ ...offers[3], replies: 3 }} canReply loading={loading} onToggleReplies={toggle}>
                        <Comment value={{ ...offers[0], score: null, replies: null }} />
                        <Comment value={{ ...offers[1], score: null, replies: null }} canReply />
                        <Comment value={{ ...offers[2], score: null, replies: null }} />
                    </Comment>

                    {offers.map(item => (
                        <Comment key={item.id} value={item} />
                    ))}
                </Container>
            </Flex>
        </Wrapper>
    );
};
