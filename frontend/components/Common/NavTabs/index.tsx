import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { ITabs } from '../../../interfaces';
import NotifNumber from '../NotifNumber';

interface IProps {
    tabs: ITabs[];
    className?: string;
    activeClass?: string;
    classNameWrp?: string;
    classNameText?: string;
    children?: JSX.Element | JSX.Element[] | string | null;
}

const NavTabs = ({ tabs, className, activeClass, classNameWrp, classNameText, children = null }: IProps): ReactElement => {
    const history = useRouter();
    return (
        <nav className={classNameWrp}>
            <ul>
                {tabs.map(item => (
                    <li key={item.text + item.link}>
                        {item.blank ? (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx(history.asPath === item.link && activeClass, className)}
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
                                <a className={clsx(history.asPath === item.link && activeClass, className)}>
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
