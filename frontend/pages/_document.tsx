import { AppProps } from 'next/app';
import Document, { DocumentContext } from 'next/document';
import React, { ReactElement } from 'react';
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<{ styles: JSX.Element; html: string; head?: JSX.Element[] }> {
        const sheets = new SheetsRegistry();
        const generateId = createGenerateId();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App =>
                    function MyApp(props: AppProps): ReactElement {
                        return (
                            <JssProvider registry={sheets} generateId={generateId}>
                                <App {...props} />
                            </JssProvider>
                        );
                    },
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style id="server-side-styles">{sheets.toString()}</style>
                </>
            ),
        };
    }
}
