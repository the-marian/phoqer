import { Meta } from '@storybook/react';
import { Wrapper } from 'src/storybook/wrapper';

import { Breadcrumb, BreadcrumbWrp } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
};

export default meta;

const value = [
    {
        url: '/',
        title: 'Home',
    },
    {
        url: '#',
        title: 'Products',
    },
    {
        url: '#',
        title: 'Phones',
    },
    {
        url: '#',
        title: 'Apple',
    },
];

export const Base = () => (
    <Wrapper title="Breadcrumbs">
        <BreadcrumbWrp>
            {value.slice(0, 2).map((item, index, array) => (
                <Breadcrumb key={index} isLast={array.length === index + 1}>
                    <a href={item.url}>{item.title}</a>
                </Breadcrumb>
            ))}
        </BreadcrumbWrp>

        <BreadcrumbWrp>
            {value.slice(0, 3).map((item, index, array) => (
                <Breadcrumb key={index} isLast={array.length === index + 1}>
                    <a href={item.url}>{item.title}</a>
                </Breadcrumb>
            ))}
        </BreadcrumbWrp>

        <BreadcrumbWrp>
            {value.map((item, index, array) => (
                <Breadcrumb key={index} isLast={array.length === index + 1}>
                    <a href={item.url}>{item.title}</a>
                </Breadcrumb>
            ))}
        </BreadcrumbWrp>
    </Wrapper>
);
