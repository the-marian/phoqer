import { ComponentPropsWithoutRef, FC } from 'react';

import css from '../empty-state.module.scss';

export const Search: FC<ComponentPropsWithoutRef<'svg'>> = props => {
    return (
        <svg {...props} viewBox="0 0 458 443" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="229" cy="221.5" rx="229" ry="221.5" className={css.background} />
            <mask
                id="mask0_2000_22"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="458"
                height="443"
            >
                <ellipse cx="229" cy="221.5" rx="229" ry="221.5" fill="var(--gray-300)" />
            </mask>
            <g mask="url(#mask0_2000_22)">
                <g filter="url(#filter0_d_2000_22)">
                    <rect x="62" y="124" width="334" height="319" rx="12" className={css.white} />
                </g>
            </g>
            <circle cx="228.5" cy="82.5" r="6.5" className={css.primary} />
            <circle cx="267.5" cy="82.5" r="6.5" className={css.white} />
            <circle cx="189.5" cy="82.5" r="6.5" className={css.white} />
            <rect x="151" y="378" width="168" height="17" rx="6" fill="var(--gray-300)" />
            <rect x="171" y="341" width="116" height="17" rx="6" fill="var(--gray-300)" />
            <circle cx="228.5" cy="245.5" r="70.5" className={css.primary} />
            <rect
                width="62.2727"
                height="8.44241"
                rx="4.22121"
                transform="matrix(0.710045 -0.704156 0.685047 0.728499 204 264.85)"
                className={css.white}
            />
            <rect
                width="62.2727"
                height="8.44241"
                rx="4.22121"
                transform="matrix(0.710045 0.704156 -0.685047 0.728499 209.783 221)"
                className={css.white}
            />
            <defs>
                <filter
                    id="filter0_d_2000_22"
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
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2000_22" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2000_22" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
