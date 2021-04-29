import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        flexGrow: 2,
        height: '100%',
        marginBottom: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.gray[0],
        overflow: 'auto',

        ...theme.media(1060).max({
            borderRadius: '0',
        }),
    },
    inner: {
        padding: theme.rem(4, 1, 1),

        ...theme.media(1060).max({
            padding: theme.rem(2, 1.5, 4),
        }),
    },
}));
const ChatFlow = (): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.root}>
            <div className={css.inner}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum
                illum in iste itaque, natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum
                in iste itaque, natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in
                iste itaque, natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste
                itaque, natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consectetur culpa cupiditate dicta enim eos fugiat harum illum in iste itaque,
                natus, neque praesentium, provident ratione tenetur veniam vero? Aspernatur, totam!
            </div>
        </div>
    );
};

export default ChatFlow;
