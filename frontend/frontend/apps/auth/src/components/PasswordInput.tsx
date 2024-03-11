import { forwardRef } from 'react';

import { useBoolean, IconButton, InputGroup, Input, InputRightElement, InputProps } from '@chakra-ui/react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [isPassword, { toggle }] = useBoolean(true);

    return (
        <InputGroup size="md">
            <Input ref={ref} pr="4rem" type={isPassword ? 'password' : 'text'} {...props} />
            <InputRightElement w="4rem" h="100%">
                <IconButton size="sm" variant="icon" aria-label="Show password" onClick={toggle}>
                    {isPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </IconButton>
            </InputRightElement>
        </InputGroup>
    );
});

PasswordInput.displayName = 'PasswordInput';
