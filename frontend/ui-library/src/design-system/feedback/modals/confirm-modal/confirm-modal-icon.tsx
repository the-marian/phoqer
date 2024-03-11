import { FC } from 'react';

import css from './confirm-modal.module.scss';

export const ConfirmModalIcon: FC = () => {
    return (
        <svg className={css.svg} viewBox="0 0 458 443" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="229" cy="221.5" rx="229" ry="221.5" fill="var(--secondary-blue-500)" />
            <mask id="mask0_2184_3" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="458" height="443">
                <ellipse cx="229" cy="221.5" rx="229" ry="221.5" fill="var(--secondary-blue-500)" />
            </mask>
            <g mask="url(#mask0_2184_3)">
                <g filter="url(#filter0_d_2184_3)">
                    <rect x="62" y="124" width="334" height="319" rx="12" fill="white" />
                </g>
            </g>
            <circle cx="228.5" cy="82.5" r="6.5" fill="var(--primary-blue-500)" />
            <circle cx="267.5" cy="82.5" r="6.5" fill="white" />
            <circle cx="189.5" cy="82.5" r="6.5" fill="white" />
            <rect x="151" y="378" width="168" height="17" rx="6" fill="var(--secondary-blue-500)" />
            <rect x="171" y="341" width="116" height="17" rx="6" fill="var(--secondary-blue-500)" />
            <circle cx="228.5" cy="245.5" r="70.5" fill="var(--primary-blue-500)" />
            <path
                d="M221.536 260.364V259.955C221.581 255.614 222.036 252.159 222.899 249.591C223.763 247.023 224.99 244.943 226.581 243.352C228.172 241.761 230.081 240.295 232.308 238.955C233.649 238.136 234.854 237.17 235.922 236.057C236.99 234.92 237.831 233.614 238.445 232.136C239.081 230.659 239.399 229.023 239.399 227.227C239.399 225 238.876 223.068 237.831 221.432C236.786 219.795 235.388 218.534 233.638 217.648C231.888 216.761 229.945 216.318 227.808 216.318C225.945 216.318 224.149 216.705 222.422 217.477C220.695 218.25 219.251 219.466 218.092 221.125C216.933 222.784 216.263 224.955 216.081 227.636H207.49C207.672 223.773 208.672 220.466 210.49 217.716C212.331 214.966 214.751 212.864 217.751 211.409C220.774 209.955 224.126 209.227 227.808 209.227C231.808 209.227 235.286 210.023 238.24 211.614C241.217 213.205 243.513 215.386 245.126 218.159C246.763 220.932 247.581 224.091 247.581 227.636C247.581 230.136 247.195 232.398 246.422 234.42C245.672 236.443 244.581 238.25 243.149 239.841C241.74 241.432 240.036 242.841 238.036 244.068C236.036 245.318 234.433 246.636 233.229 248.023C232.024 249.386 231.149 251.011 230.604 252.898C230.058 254.784 229.763 257.136 229.717 259.955V260.364H221.536ZM225.899 280.545C224.217 280.545 222.774 279.943 221.57 278.739C220.365 277.534 219.763 276.091 219.763 274.409C219.763 272.727 220.365 271.284 221.57 270.08C222.774 268.875 224.217 268.273 225.899 268.273C227.581 268.273 229.024 268.875 230.229 270.08C231.433 271.284 232.036 272.727 232.036 274.409C232.036 275.523 231.751 276.545 231.183 277.477C230.638 278.409 229.899 279.159 228.967 279.727C228.058 280.273 227.036 280.545 225.899 280.545Z"
                fill="white"
            />
            <defs>
                <filter
                    id="filter0_d_2184_3"
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
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2184_3" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2184_3" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
