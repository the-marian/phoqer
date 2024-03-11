import { FC, useContext, useEffect, useState } from 'react';

import {
    Button,
    ChevronRightIcon,
    Container,
    Flex,
    Grid3x3Icon,
    ListIcon,
    SegmentedControlItem,
    SegmentedControlList,
    Option,
    Skeleton,
    Text,
    Heading,
    ToastProvider,
    ReduceAnimationsProvider,
} from 'phoqer';

import { Footer } from 'src/components/footer/footer';
import { Header } from 'src/components/header/header';
import { Lang } from 'src/components/header/lang/lang';
import { Uploader } from 'src/components/uploader/uploader';
import type { ImageUploadStatus } from 'src/components/uploader/uploader.type';
import { UserNav } from 'src/components/user-nav/user-nav';
import { AccountType, AuthContext, AuthContextProvider } from 'src/context/auth.context';
import { changeLocale } from 'src/utils/change-locale';

import { Appear } from './components/appear/appear';
import { SubHeader } from './components/sub-header/sub-header';
import css from './styles/section.module.scss';

import 'phoqer/dist/styles/root.scss';

export const Inner: FC = () => {
    const { auth, loading, logout } = useContext(AuthContext);
    const [location, setLocation] = useState('en-US');
    const [uploads, setUploads] = useState<ImageUploadStatus[]>([]);

    useEffect(() => {
        const handler = ({ detail }: CustomEvent<string>): void => {
            setLocation(detail);
        };

        changeLocale.subscribe(handler as EventListener);
        return () => {
            changeLocale.unsubscribe(handler as EventListener);
        };
    }, []);

    const handleChangeTheme = (): void => {
        document.body.classList.toggle('black');
    };

    return (
        <div>
            <Header>
                <Button style={{ marginRight: 20 }} size="sm" variant="text">
                    Create an offer
                </Button>

                <Button style={{ marginRight: 20 }} size="sm" onClick={handleChangeTheme}>
                    Change theme
                </Button>

                <Lang
                    locale={location}
                    values={[
                        { locale: 'en-US', title: 'English' },
                        { locale: 'pl', title: 'Polish' },
                        { locale: 'uk', title: 'Ukrainian' },
                    ]}
                />

                {loading ? (
                    <Skeleton color="blue" style={{ height: '3rem', width: '10rem' }} />
                ) : auth ? (
                    <UserNav>
                        <Option size="sm" onClick={() => undefined}>
                            Messages
                        </Option>
                        <Option size="sm" onClick={() => undefined}>
                            Account
                        </Option>
                        <Option size="sm" onClick={logout}>
                            Log out
                        </Option>
                    </UserNav>
                ) : (
                    <>
                        <Button
                            size="sm"
                            style={{ marginRight: '2rem' }}
                            onClick={() => {
                                localStorage.setItem('token', 'token');
                                window.location.reload();
                            }}
                        >
                            Log In
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => {
                                localStorage.setItem('token', 'token');
                                window.location.reload();
                            }}
                        >
                            Sign In
                        </Button>
                    </>
                )}
            </Header>

            <SubHeader onBack={console.log} onHome={console.log}>
                <Text size="sm">Lorem ipsum dolor sit amet</Text>
            </SubHeader>

            <main
                style={{
                    minHeight: 'calc(100vh - var(--footer-height))',
                    paddingTop: 'calc(2rem + var(--header-height) * 2)',
                    paddingBottom: '10rem',
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.4em',
                }}
            >
                <Appear>
                    <Container size="lg">
                        <Heading size="lg" style={{ marginBottom: '6rem', maxWidth: '70rem' }}>
                            Phoqer shared elements
                        </Heading>
                    </Container>
                </Appear>

                <Appear timeout={500}>
                    <Container size="lg">
                        <Heading as="h2" style={{ margin: '2rem 0' }}>
                            Upload media
                        </Heading>

                        <Uploader
                            uploads={uploads}
                            setUploads={setUploads}
                            onSubmit={async (body: FormData): Promise<string> => {
                                console.log(body);
                                return await new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve(
                                            'https://images.unsplash.com/photo-1652709909822-99d51be26000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                                        );
                                    }, 3000);
                                });
                            }}
                        />
                    </Container>
                </Appear>

                <section className={css.root}>
                    <Container size="md">
                        <Flex align="center" justify="space-between" className={css.header}>
                            <Heading as="h2" size="md">
                                Section
                            </Heading>

                            <Flex align="center" justify="space-between">
                                <SegmentedControlList>
                                    <SegmentedControlItem isActive>
                                        <button type="button">
                                            <ListIcon />
                                        </button>
                                    </SegmentedControlItem>
                                    <SegmentedControlItem>
                                        <button type="button">
                                            <Grid3x3Icon />
                                        </button>
                                    </SegmentedControlItem>
                                </SegmentedControlList>

                                <Button size="sm" variant="secondary" rightIcon={<ChevronRightIcon />} style={{ marginLeft: 20 }}>
                                    View all
                                </Button>
                            </Flex>
                        </Flex>

                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam amet animi asperiores,
                            culpa delectus deleniti dolor doloribus error in, laborum magnam maxime placeat, praesentium quibusdam
                            quisquam vero! Facilis, voluptatem?
                        </Text>
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export const App: FC = () => {
    return (
        <AuthContextProvider
            tokenKey="token"
            http={async () => {
                return await new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            id: '3',
                            firstName: 'Evgeny',
                            lastName: 'Siroshtan',
                            avatar: 'https://images.unsplash.com/photo-1649626306353-126afb2aa9a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                            email: 'example@ukr.net',
                            accountType: AccountType.AUTHOR,
                            date: 1650285347362,
                        });
                    }, 2000);
                });
            }}
        >
            <ReduceAnimationsProvider>
                <ToastProvider>
                    <Inner />
                </ToastProvider>
            </ReduceAnimationsProvider>
        </AuthContextProvider>
    );
};
