import { ComponentPropsWithoutRef, FC } from 'react';

import css from '../empty-state.module.scss';

export const Form: FC<ComponentPropsWithoutRef<'svg'>> = props => {
    return (
        <svg {...props} viewBox="0 0 458 443" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="229" cy="221.5" rx="229" ry="221.5" className={css.background} />
            <mask
                id="mask0_1998_161"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="458"
                height="443"
            >
                <ellipse cx="229" cy="221.5" rx="229" ry="221.5" fill="var(--gray-300)" />
            </mask>
            <g mask="url(#mask0_1998_161)">
                <g filter="url(#filter0_d_1998_161)">
                    <rect x="62" y="124" width="334" height="319" rx="12" className={css.white} />
                </g>
            </g>
            <circle cx="228.5" cy="82.5" r="6.5" className={css.primary} />
            <circle cx="267.5" cy="82.5" r="6.5" className={css.white} />
            <circle cx="189.5" cy="82.5" r="6.5" className={css.white} />
            <rect x="87" y="159" width="168" height="17" rx="6" fill="var(--gray-300)" />
            <rect x="87" y="268" width="116" height="17" rx="6" fill="var(--gray-300)" />
            <rect
                x="89.5"
                y="195.5"
                width="287"
                height="53"
                rx="9.5"
                className={css.white}
                stroke="var(--primary-blue-500)"
                strokeWidth="5"
            />
            <circle cx="289.5" cy="244.5" r="14.5" fill="var(--secondary-2)" />
            <path
                d="M286.847 273.727V247.122C286.847 245.53 287.481 244.004 288.608 242.879C289.782 241.707 291.685 241.707 292.859 242.879L293.482 243.5C294.211 244.227 294.62 245.214 294.62 246.243V262.091L295.783 259.595C295.812 259.532 295.848 259.471 295.892 259.417C297.743 257.131 302.606 258.199 303.789 260.909C303.815 260.969 303.833 261.032 303.845 261.097L304.327 263.674L305.827 262C307.8 260.031 311.651 261.445 312.687 264.03L313.687 267.909L314.771 266.075C314.847 265.946 314.951 265.834 315.08 265.758C316.573 264.884 318.671 264.982 320.187 267C321.408 268.624 321.827 270.849 321.827 272.879V286.674C321.827 287.09 321.759 287.505 321.627 287.9L320.727 290.596C320.18 292.233 319.103 293.641 317.664 294.598L316.012 295.697C314.735 296.547 313.235 297 311.7 297H295.777C293.74 297 291.732 296.514 289.921 295.582V295.582C287.931 294.558 286.35 292.887 285.437 290.844L275.187 267.909C274.327 265 276.549 262.246 279.37 263.373V263.373C280.439 263.799 281.338 264.564 281.931 265.55L286.847 273.727Z"
                className={css.primary}
            />
            <defs>
                <filter
                    id="filter0_d_1998_161"
                    x="43"
                    y="103"
                    width="378"
                    height="363"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="3" dy="1" />
                    <feGaussianBlur stdDeviation="11" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1998_161" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1998_161" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
