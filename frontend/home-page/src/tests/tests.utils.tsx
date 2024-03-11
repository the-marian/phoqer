import { FC, PropsWithChildren, ReactElement } from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult => {
    const AppProviders: FC<PropsWithChildren> = ({ children }) => children;

    return render(ui, {
        wrapper: AppProviders,
        ...options,
    } as RenderOptions);
};

export * from '@testing-library/react';

export { customRender as render };
