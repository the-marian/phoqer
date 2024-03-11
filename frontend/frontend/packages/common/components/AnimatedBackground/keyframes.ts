import { keyframes } from '@emotion/react';

export const one = keyframes`
    0% {
        top: 50%;
        left: 5%;
        background: var(--chakra-colors-green-600);
    }
    35% {
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%) scale(1.4);
        background: var(--chakra-colors-blue-500);
    }
    75% {
        top: 70%;
        left: 20%;
        transform: translate(-50%, -50%) scale(0.5);
        background: var(--chakra-colors-blue-500);
    }
    100% {
        top: 50%;
        left: 5%;
        background: var(--chakra-colors-green-600);
    }
`;

export const two = keyframes`
    0% {
        top: 65%;
        left: 75%;
        background: var(--chakra-colors-red-500);
    }
    75% {
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.4);
        background: var(--chakra-colors-blue-500);
    }
    35% {
        top: 56%;
        left: 22%;
        transform: translate(-50%, -50%) scale(0.8);
        background: var(--chakra-colors-blue-500);
    }
    100% {
        top: 65%;
        left: 75%;
        background: var(--chakra-colors-red-500);
    }
`;

export const three = keyframes`
    0% {
        top: 20%;
        left: 90%;
      background: var(--chakra-colors-blue-500);
    }
    75% {
        top: 40%;
        left: 20%;
        transform: translate(-50%, -50%) scale(1.4);
        background: var(--chakra-colors-green-600);
    }
    35% {
        top: 66%;
        left: 82%;
        transform: translate(-50%, -50%) scale(0.8);
        background: var(--chakra-colors-green-600);
    }
    100% {
        top: 20%;
        left: 90%;
        background: var(--chakra-colors-blue-500);
    }
`;
