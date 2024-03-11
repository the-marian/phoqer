import { FC, useCallback } from 'react';

import { useNewOffer } from '@author/providers';
import { Steps, OfferTitle } from '@author/types';
import { defaultData } from '@author/utils';
import { FormControl, FormErrorMessage, Text, Stack, Input, Heading, Container, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { PageShell, FormFooter } from '../Common';

import { MAX_LENGTH, TitleSchema } from './validation';

export const Title: FC = () => {
    const navigate = useNavigate();
    const { setData, setStep, data, showToastMessage, errorWrapper } = useNewOffer();
    const {
        register,
        getValues,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<OfferTitle>({
        defaultValues: data,
        resolver: yupResolver(TitleSchema),
    });

    const onReset = useCallback((): void => {
        errorWrapper(() => {
            setData(defaultData);
            reset(defaultData);
        });
    }, [reset]);

    const onSave = useCallback((): void => {
        errorWrapper(() => {
            setData(getValues());
            showToastMessage();
        });
    }, [getValues]);

    const goBack = useCallback((): void => {
        errorWrapper(() => {
            setData(getValues());
            navigate('/');
        });
    }, [getValues]);

    const onSubmit = (data: OfferTitle): void => {
        errorWrapper(() => {
            setStep(Steps.Description);
            setData(data);
        });
    };

    return (
        <PageShell onBack={goBack} onSave={onSave} onReset={onReset}>
            <Container px={4} maxW="600px" as="form" action="#" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={6} alignItems="flex-start">
                    <Stack>
                        <Heading fontWeight={500}>Start now</Heading>
                        <Text color="text.secondary">
                            Craft a descriptive title for your offer: choose keywords that make your offer easily discoverable!
                        </Text>
                    </Stack>

                    <FormControl isInvalid={Boolean(errors.title?.message)} flex={1}>
                        <Input size="lg" {...register('title', { maxLength: MAX_LENGTH })} />
                        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                    </FormControl>

                    <FormFooter>
                        <Button type="submit" size="lg" variant="pill" rightIcon={<MdArrowForward />} isDisabled={!isValid}>
                            Save and Continue
                        </Button>
                    </FormFooter>
                </Stack>
            </Container>
        </PageShell>
    );
};
