import { FC } from 'react';

import { Input, Stack, FormControl, FormLabel, Button, FormErrorMessage, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash-es';
import { SignupBody, useLogIn, useSignUp } from 'query';
import { useForm } from 'react-hook-form';

import { JoinSchema } from '../utils';

import { PasswordInput } from './PasswordInput';

export const SignupForm: FC = () => {
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupBody>({ resolver: yupResolver(JoinSchema) });

    const { mutate: signUp, isLoading: isSignUpLoading } = useSignUp();
    const { mutate: logIn, isLoading: isLogInLoading } = useLogIn();

    const onSubmit = (data: SignupBody) => {
        signUp(data, {
            onSuccess: () => {
                logIn(omit(data, ['lastName', 'firstName']));
            },
            onError: () => {
                toast({
                    variant: 'error',
                    status: 'error',
                    title: 'Something went wrong',
                    description: 'Error while signing up',
                });
            },
        });
    };

    return (
        <Stack spacing={6} as="form" action="#" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.email?.message)}>
                <FormLabel>Email</FormLabel>
                <Input type="email" autoComplete="email" size="lg" placeholder="Enter a value" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password?.message)}>
                <FormLabel>Password</FormLabel>
                <PasswordInput autoComplete="password" size="lg" placeholder="****" {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.firstName?.message)}>
                <FormLabel>First name</FormLabel>
                <Input autoComplete="given-name" size="lg" placeholder="Enter a value" {...register('firstName')} />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.lastName?.message)}>
                <FormLabel>Surname</FormLabel>
                <Input autoComplete="family-name" size="lg" placeholder="Enter a value" {...register('lastName')} />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" size="lg" mt={6} isLoading={isSignUpLoading || isLogInLoading}>
                Sign Up
            </Button>
        </Stack>
    );
};
