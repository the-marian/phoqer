import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import { FC, FormEvent, useCallback } from 'react';

import { useQuillEditor } from '@author/hooks';
import { useNewOffer } from '@author/providers';
import { Steps } from '@author/types';
import { defaultData } from '@author/utils';
import {
    Tooltip,
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    Heading,
    HStack,
    Stack,
    Text,
    Icon,
    Image,
} from '@chakra-ui/react';
import { MdArrowForward, MdInfoOutline } from 'react-icons/md';
import sanitizeHtml from 'sanitize-html';

import { PageShell, FormFooter } from '../Common';

import { DescriptionSchema } from './validation';

const COMMON_ERROR_TITLE = 'Something went wrong';

export const Description: FC = () => {
    const { data, setData, setStep, errorWrapper, showToastMessage } = useNewOffer();
    const { content, ref, quill, error, setError } = useQuillEditor(data.description);

    const onReset = useCallback((): void => {
        setData(defaultData);
        setError('');
        quill.current!.setText('');
    }, []);

    const showFormError = useCallback(async (callback: () => Promise<void>) => {
        try {
            await callback();
        } catch (error) {
            setError((error as { message?: string })?.message || COMMON_ERROR_TITLE);
        }
    }, []);

    const onSave = useCallback(async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (quill.current) {
                errorWrapper(() => {
                    setData({ description: quill.current?.root.innerHTML });
                    resolve();
                });
            } else {
                reject(COMMON_ERROR_TITLE);
            }
        });
    }, []);

    const osSaveWithToast = useCallback(() => showFormError(() => onSave().then(showToastMessage)), []);

    const goBack = useCallback(() => showFormError(() => onSave().then(() => setStep(Steps.Title))), []);

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        return showFormError(() =>
            onSave().then(() => {
                const description = quill.current?.getText()?.trim() || '';
                return DescriptionSchema.validate({ description })
                    .then(() => onSave())
                    .then(() => setStep(Steps.Parameters));
            }),
        );
    }, []);

    return (
        <PageShell onBack={goBack} onSave={osSaveWithToast} onReset={onReset}>
            <Container px={4} maxW="600px" as="form" action="#" onSubmit={handleSubmit}>
                <Stack spacing={6} alignItems="flex-start">
                    <Stack>
                        <Heading fontWeight={500}>Keep going!</Heading>

                        <Text color="text.secondary">
                            Compose a comprehensive description of your offer, addressing all potential questions your clients
                            might have.
                        </Text>
                        <Tooltip label={<Image src="/text-editor.gif" w="450px" objectFit="contain" alt="" />}>
                            <HStack mt={6} alignItems="center" w="max-content">
                                <Icon as={MdInfoOutline} boxSize="20px" />
                                <Text fontWeight={600}>How do edit content</Text>
                            </HStack>
                        </Tooltip>
                    </Stack>

                    <FormControl isInvalid={Boolean(error)}>
                        <Box
                            ref={ref}
                            tabIndex={0}
                            zIndex={10}
                            className="description"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.current as string) }}
                            sx={{
                                border: '1px solid',
                                borderColor: 'gray.400',
                                borderRadius: 'lg',
                                '.ql-bubble .ql-tooltip': {
                                    zIndex: 10,
                                },
                                _hover: {
                                    borderColor: 'gray.700',
                                },
                                _focus: {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 0 0 2px var(--chakra-colors-primary-main)',
                                },
                                _dark: {
                                    borderColor: 'gray.700',
                                    _hover: {
                                        borderColor: 'gray.500',
                                    },
                                },
                            }}
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>

                    <FormFooter>
                        <Button type="submit" size="lg" variant="pill" rightIcon={<MdArrowForward />}>
                            Save and Continue
                        </Button>
                    </FormFooter>
                </Stack>
            </Container>
        </PageShell>
    );
};
