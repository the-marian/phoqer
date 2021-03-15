import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { ITabs } from '../../../interfaces';
import NotifNumber from '../NotifNumber';

interface IProps {
    tabs: ITabs[];
    active?: number | string;
    className?: string;
    activeClass?: string;
    classNameWrp?: string;
    classNameText?: string;
    children?: JSX.Element | JSX.Element[] | string | null;
}

const NavTabs = ({
    tabs,
    active,
    className,
    activeClass,
    classNameWrp,
    classNameText,
    children = null,
}: IProps): ReactElement => {
    return (
        <nav className={classNameWrp}>
            <ul>
                {tabs.map(item => (
                    <li key={item.id}>
                        {item.blank ? (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx(active === item.id && activeClass, className)}
                                href={item.link}
                            >
                                {item.icon ? <FontAwesomeIcon icon={item.icon} /> : null}
                                <span className={classNameText}>{item.text}</span>
                                {item?.count ? (
                                    <NotifNumber style={{ position: 'static', top: 'unset', left: 'unset', marginLeft: '1rem' }}>
                                        {item?.count}
                                    </NotifNumber>
                                ) : null}
                            </a>
                        ) : (
                            <Link href={item.link} shallow>
                                <a className={clsx(active === item.id && activeClass, className)}>
                                    {item.icon ? <FontAwesomeIcon icon={item.icon} /> : null}
                                    <span className={classNameText}>{item.text}</span>
                                    {item?.count ? (
                                        <NotifNumber
                                            style={{ position: 'static', top: 'unset', left: 'unset', marginLeft: '1rem' }}
                                        >
                                            {item?.count}
                                        </NotifNumber>
                                    ) : null}
                                </a>
                            </Link>
                        )}
                    </li>
                ))}
                {children}
            </ul>
        </nav>
    );
};

export default NavTabs;
