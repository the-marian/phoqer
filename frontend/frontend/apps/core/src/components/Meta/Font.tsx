import { FC } from 'react';

interface Props {
    heading: string;
    body: string;
}
export const Font: FC<Props> = ({ heading, body }) => {
    return (
        <style jsx global>
            {`
                :root {
                    --font-heading: ${heading};
                    --font-body: ${body};
                }

                body {
                    font-family: var(--font-body);
                }
            `}
        </style>
    );
};
