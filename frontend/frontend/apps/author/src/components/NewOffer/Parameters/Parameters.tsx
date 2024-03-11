import { FC, useCallback } from 'react';

import { useNewOffer } from '@author/providers';
import { OfferParameters, Steps } from '@author/types';
import { defaultData } from '@author/utils';
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { currencyMap } from 'common';
import { CreateOfferBody, ID, OfferItem, useCreateOffer, useUpdateOffer } from 'query';
import { Controller, useForm } from 'react-hook-form';
import { MdArrowForward } from 'react-icons/md';

import { PageShell, FormFooter } from '../Common';

import { Categories } from './Categories';
import { ParametersSchema } from './validation';

export const Parameters: FC = () => {
    const { setData, setStep, data, errorWrapper, showToastMessage } = useNewOffer();
    const {
        control,
        register,
        getValues,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<OfferParameters>({
        defaultValues: data,
        resolver: yupResolver<OfferParameters>(ParametersSchema),
    });

    const { mutate: createOffer, isLoading: isCreatingOffer } = useCreateOffer();
    const { mutate: updateOffer, isLoading: isUpdatingOffer } = useUpdateOffer();

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
            setStep(Steps.Description);
        });
    }, [getValues]);

    const onSubmit = (formState: OfferParameters): void => {
        const body = { ...data, ...formState } as CreateOfferBody & { id: ID };

        const onSuccess = (resBody: OfferItem) => {
            errorWrapper(() => {
                setData({ ...formState, id: resBody.id });
                setStep(Steps.Images);
            });
        };

        if (body.id) {
            return updateOffer(body, { onSuccess });
        }

        createOffer(body, { onSuccess });
    };

    return (
        <PageShell onBack={goBack} onSave={onSave} onReset={onReset}>
            <Container px={4} maxW="600px" as="form" action="#" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={8} alignItems="flex-start">
                    <Stack>
                        <Heading fontWeight={500}>Great job!</Heading>
                        <Text color="text.secondary">
                            Specify a category for your offer to make it easier for users to find it
                        </Text>
                    </Stack>

                    <FormControl isInvalid={Boolean(errors.category?.message)}>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => <Categories slug={field.value} onChange={field.onChange} />}
                        />
                        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.price?.message)}>
                        <FormLabel>
                            Price <b>[UAH per Hour]</b>
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                px={6}
                                h="48px"
                                bg="gray.200"
                                fontSize="lg"
                                textAlign="center"
                                border="1px solid"
                                borderColor="gray.500"
                                _dark={{ bg: 'gray.700', borderColor: 'gray.700' }}
                            >
                                {currencyMap['UAH']}
                            </InputLeftAddon>
                            <Input
                                size="lg"
                                step="0.01"
                                type="number"
                                onKeyDown={event => {
                                    if (event.key === 'e') {
                                        event.preventDefault();
                                    }
                                }}
                                {...register('price', {
                                    min: 0,
                                    max: 5_000_000,
                                    valueAsNumber: true,
                                })}
                            />
                        </InputGroup>
                        <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                    </FormControl>

                    <FormFooter>
                        <Button
                            type="submit"
                            size="lg"
                            variant="pill"
                            isDisabled={!isValid}
                            rightIcon={<MdArrowForward />}
                            isLoading={isCreatingOffer || isUpdatingOffer}
                        >
                            Save and Continue
                        </Button>
                    </FormFooter>
                </Stack>
            </Container>
        </PageShell>
    );
};
