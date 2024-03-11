import { FC } from 'react';

import { Input, Stack, FormControl, FormLabel, FormErrorMessage, Button, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginBody, useLogIn } from 'query';
import { useForm } from 'react-hook-form';

import { LoginSchema } from '../utils';

import { PasswordInput } from './PasswordInput';

export const LoginForm: FC = () => {
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginBody>({ resolver: yupResolver(LoginSchema) });

    const { mutate, isLoading } = useLogIn();

    const onSubmit = (data: LoginBody) => {
        mutate(data, {
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
                <Input type="email" autoComplete="email" placeholder="Enter a value" size="lg" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password?.message)}>
                <FormLabel>Password</FormLabel>
                <PasswordInput autoComplete="password" placeholder="****" size="lg" {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" size="lg" mt={6} isLoading={isLoading}>
                Log In
            </Button>
        </Stack>
    );
};
