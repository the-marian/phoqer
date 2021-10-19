import React, { Fragment, ReactElement } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import useMedia from '../../../../hooks/media.hook';
import { IChats } from '../../../../interfaces';
import mixin from '../../../../utils/theming/mixin';
import { Theme } from '../../../../utils/theming/theme';
import ChatEmpty from '../components/chat-empty';

import ChatSidebarItem from './chat-sidebar-item';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: theme.rem(1, 0),
        padding: theme.rem(2),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),

        ...mixin(theme).outline,
    },
    active: {
        background: theme.palette.gray[1],
    },
    name: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[4],
    },
    inner: {
        width: '100%',
        marginLeft: theme.rem(1),
    },
    text: {
        marginTop: theme.rem(1),
        color: theme.palette.gray[3],
    },
    end: {
        margin: theme.rem(2, 0, 4),
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.4),
        textAlign: 'center',
    },
    box: {
        margin: theme.rem(1, 0),
    },
}));

interface IProps {
    chats: IChats[];
}

const ChatSidebarLeft = ({ chats }: IProps): ReactElement => {
    const css = useStyles();
    const media = useMedia(768);
    const { query } = useRouter();
    const active = +String(query.chat || '0');

    return (
        <>
            {chats?.length ? (
                chats.map<ReactElement>((item, index) => (
                    <Fragment key={item.chat_id}>
                        {!(index % 4) && index > 3 && (
                            <div className={css.box}>
                                <ins
                                    className="adsbygoogle"
                                    style={{ display: 'block' }}
                                    data-ad-client="ca-pub-2424155820333209"
                                    data-ad-slot="7611310481"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"
                                />
                            </div>
                        )}
                        <ChatSidebarItem chat={item} active={active === item.chat_id} />
                    </Fragment>
                ))
            ) : (
                <ChatEmpty small height={media ? 'calc(100vh - 18rem)' : 40} aside />
            )}
            <div className={css.end}>
                <h5>Phoqer</h5>
                <p>© 2021</p>
                <p>All rights reserved</p>
            </div>
        </>
    );
};

export default ChatSidebarLeft;
