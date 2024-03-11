import { FC, SVGProps } from 'react';

export const PassIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M158 22H54C36.3269 22 22 36.3269 22 54V157" stroke="currentColor" strokeWidth="32" />
            <path d="M22 355V458C22 475.673 36.3269 490 54 490H160" stroke="currentColor" strokeWidth="32" />
            <path d="M490 355V458C490 475.673 475.673 490 458 490H352" stroke="currentColor" strokeWidth="32" />
            <path d="M354 22H458C475.673 22 490 36.3269 490 54V157" stroke="currentColor" strokeWidth="32" />

            <rect x="159" y="247" width="193" height="144" rx="35" stroke="currentColor" strokeWidth="32" />
            <path
                d="M310 241.262V207C310 178.833 287.167 156 259 156H252C223.833 156 201 178.833 201 207V241.262"
                stroke="currentColor"
                strokeWidth="32"
            />
        </svg>
    );
};
