import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../../assets/config';
import { serverRedirect } from '../../../../../assets/helpers';
import { Theme } from '../../../../../assets/theme';
import Meta from '../../../../../components/Common/Meta';
import NavTabs from '../../../../../components/Common/NavTabs';
import Container from '../../../../../components/Layout/Container';
import Main from '../../../../../components/Layout/TagMain';
import useTrans from '../../../../../hooks/trans.hook';
import { ITabs } from '../../../../../interfaces';
import { wrapper } from '../../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    tabs: {
        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: theme.rem(6),
        },

        '& li': {
            flexGrow: 1,

            '@media (max-width: 1300px)': {
                flexGrow: 'unset',
            },
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.rem(1.2, 2),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        fontSize: theme.rem(1.6),
        borderBottom: theme.border(0.2, 'transparent'),
        transition: theme.transitions[0],

        '& svg': {
            marginRight: theme.rem(1),
        },

        '&:hover': {
            borderBottom: theme.border(0.2, theme.palette.primary[0]),
        },
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        borderBottom: theme.border(0.2, theme.palette.primary[0]),
    },
}));

const Referral = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const history = useRouter();

    const profileTabs: ITabs[] = config.userProfileLinks(String(history.query.profileId), T, { messages: 5, reviews: 4 });

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <Main>
                <Container>
                    <NavTabs tabs={profileTabs} classNameWrp={css.tabs} className={css.item} activeClass={css.active} />
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aperiam dolorem dolores eaque et,
                        excepturi fugiat impedit incidunt magni maiores molestiae neque quasi quidem, soluta sunt vero. Sequi,
                        voluptatibus?
                    </div>
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default Referral;
