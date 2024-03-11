import React from 'react';

import { Text } from 'phoqer';
import { useTranslation } from 'react-i18next';

import css from './empty-chat.module.scss';

export const EmptyChat = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={css.root}>
            <div className={css.inner}>
                <svg viewBox="0 0 458 475" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="229" cy="253.5" rx="229" ry="221.5" fill="var(--secondary-1)" />
                    <mask
                        id="mask0_2407_5"
                        style={{ maskType: 'alpha' }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="32"
                        width="458"
                        height="443"
                    >
                        <ellipse cx="229" cy="253.5" rx="229" ry="221.5" fill="var(--secondary-1)" />
                    </mask>
                    <g mask="url(#mask0_2407_5)">
                        <g filter="url(#filter0_d_2407_5)">
                            <rect x="71" y="176" width="316" height="141" rx="12" fill="var(--white)" />
                        </g>
                        <rect x="90.2686" y="189.578" width="40" height="40" rx="20" fill="var(--primary-1)" />
                        <rect x="140.064" y="196.889" width="51.3821" height="9.4" rx="4.7" fill="var(--secondary-1)" />
                        <rect x="140.064" y="212.556" width="142.585" height="9.4" rx="4.7" fill="var(--secondary-1)" />
                        <rect x="94.876" y="256.422" width="263.333" height="9.4" rx="4.7" fill="var(--gray-3)" />
                        <rect x="94.876" y="276.267" width="186.26" height="9.4" rx="4.7" fill="var(--gray-3)" />
                        <g filter="url(#filter1_d_2407_5)">
                            <rect x="71" y="334" width="316" height="141" rx="12" fill="var(--white)" />
                        </g>
                        <rect x="90.2686" y="347.578" width="40" height="40" rx="20" fill="var(--primary-1)" />
                        <rect x="140.064" y="354.889" width="51.3821" height="9.4" rx="4.7" fill="var(--secondary-1)" />
                        <rect x="140.064" y="370.556" width="142.585" height="9.4" rx="4.7" fill="var(--secondary-1)" />
                        <rect x="94.876" y="414.422" width="263.333" height="9.4" rx="4.7" fill="var(--gray-3)" />
                        <rect x="94.876" y="434.267" width="186.26" height="9.4" rx="4.7" fill="var(--gray-3)" />
                    </g>
                    <g filter="url(#filter2_d_2407_5)">
                        <rect x="71" y="18" width="316" height="141" rx="12" fill="var(--gray-8)" />
                    </g>
                    <rect x="90.2686" y="31.5778" width="40" height="40" rx="20" fill="var(--white)" />
                    <rect x="140.064" y="38.8889" width="51.3821" height="9.4" rx="4.7" fill="var(--secondary-1)" />
                    <rect x="140.064" y="54.5556" width="142.585" height="9.4" rx="4.7" fill="var(--secondary-1)" />
                    <rect x="94.876" y="98.4222" width="263.333" height="9.4" rx="4.7" fill="var(--gray-3)" />
                    <rect x="94.876" y="118.267" width="186.26" height="9.4" rx="4.7" fill="var(--gray-3)" />
                    <defs>
                        <filter
                            id="filter0_d_2407_5"
                            x="55"
                            y="158"
                            width="354"
                            height="179"
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
                            <feGaussianBlur stdDeviation="9.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2407_5" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2407_5" result="shape" />
                        </filter>
                        <filter
                            id="filter1_d_2407_5"
                            x="55"
                            y="316"
                            width="354"
                            height="179"
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
                            <feGaussianBlur stdDeviation="9.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2407_5" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2407_5" result="shape" />
                        </filter>
                        <filter
                            id="filter2_d_2407_5"
                            x="55"
                            y="0"
                            width="354"
                            height="179"
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
                            <feGaussianBlur stdDeviation="9.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2407_5" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2407_5" result="shape" />
                        </filter>
                    </defs>
                </svg>

                <Text>
                    {t('Welcome!')}
                    <br />
                    {t('Select a chat on sidebar menu')}
                </Text>
            </div>
        </div>
    );
};
