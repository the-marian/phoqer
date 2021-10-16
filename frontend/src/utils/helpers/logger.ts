// custom console log for site identity
export const logger = (): void => {
    if (process.browser) {
        console.clear();
        console.log(
            '%c Phoqer %c v0.0.1 Made with love ...',
            'padding: 6px 15px; border-radius: 10px; background: #eee; text-transform: uppercase; color: #007aff; font-size: 1rem; font-weight: 600; font-family: Montserrat, sans-serif',
            'color: #DB162F; font-size: 0.8rem;',
        );
        console.log('%c Coming soon... The website is under construction', 'font-size: 1.2rem;');
    }
};
