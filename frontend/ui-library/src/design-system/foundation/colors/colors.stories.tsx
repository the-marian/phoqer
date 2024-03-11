import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';
import { copyToClipboard } from 'src/utils/copy';

export default {
    title: 'Foundation/Colors',
};

const data = [
    { color: '#2d3338;', value: ' --secondary-blue-400', name: 'Secondary Blue 400' },
    { color: '#3d464f;', value: ' --secondary-blue-500', name: 'Secondary Blue 500' },
    { color: '#455462;', value: ' --secondary-blue-600', name: 'Secondary Blue 600' },
    { color: '#709fdc;', value: ' --primary-blue-400', name: 'Primary Blue 400' },
    { color: '#0364a8;', value: ' --primary-blue-500', name: 'Primary Blue 500' },
    { color: '#274684;', value: ' --primary-blue-600', name: 'Primary Blue 600' },
    { color: '#3f3838;', value: ' --secondary-red-400', name: 'Secondary Red 400' },
    { color: '#544949;', value: ' --secondary-red-500', name: 'Secondary Red 500' },
    { color: '#655454;', value: ' --secondary-red-600', name: 'Secondary Red 600' },
    { color: '#f58575;', value: ' --primary-red-400', name: 'Primary Red 400' },
    { color: '#dc4b48;', value: ' --primary-red-500', name: 'Primary Red 500' },
    { color: '#b53543;', value: ' --primary-red-600', name: 'Primary Red 600' },
    { color: '#2f3b36;', value: ' --secondary-green-400', name: 'Secondary Green 400' },
    { color: '#41574e;', value: ' --secondary-green-500', name: 'Secondary Green 500' },
    { color: '#4b6c5f;', value: ' --secondary-green-600', name: 'Secondary Green 600' },
    { color: '#349a6d;', value: ' --primary-green-400', name: 'Primary Green 400' },
    { color: '#37745b;', value: ' --primary-green-500', name: 'Primary Green 500' },
    { color: '#217074;', value: ' --primary-green-600', name: 'Primary Green 600' },
    { color: '#4f483c;', value: ' --secondary-yellow-400', name: 'Secondary Yellow 400' },
    { color: '#645946;', value: ' --secondary-yellow-500', name: 'Secondary Yellow 500' },
    { color: '#817052;', value: ' --secondary-yellow-600', name: 'Secondary Yellow 600' },
    { color: '#dab97b;', value: ' --primary-yellow-400', name: 'Primary Yellow 400' },
    { color: '#feca64;', value: ' --primary-yellow-500', name: 'Primary Yellow 500' },
    { color: '#fcac23;', value: ' --primary-yellow-600', name: 'Primary Yellow 600' },
    { color: '#323438;', value: ' --gray-50', name: 'Gray 50' },
    { color: '#37383b;', value: ' --gray-100', name: 'Gray 100' },
    { color: '#4a4c4d;', value: ' --gray-150', name: 'Gray 150' },
    { color: '#525254;', value: ' --gray-200', name: 'Gray 200' },
    { color: '#8c8c8c;', value: ' --gray-300', name: 'Gray 300' },
    { color: '#bfbfbf;', value: ' --gray-400', name: 'Gray 400' },
    { color: '#d9d9d9;', value: ' --gray-500', name: 'Gray 500' },
    { color: '#f0f0f0;', value: ' --gray-600', name: 'Gray 600' },
    { color: '#f5f5f5;', value: ' --gray-700', name: 'Gray 700' },
    { color: '#fafafa;', value: ' --gray-800', name: 'Gray 800' },
    { color: '#16162a;', value: ' --white', name: 'White' },
    { color: '#fff;', value: ' --black', name: 'Black' },
    { color: '#fff;', value: ' --white-true', name: 'White True' },
    { color: '#16162a;', value: ' --black-true', name: 'Black True' },
    { color: '#292d2d;', value: ' --body', name: 'Body' },
];

const styles = `<style>
.grid-item {
    padding: 1.7rem;
}
.color {
    height: 20rem;
    width: 100%;
    margin-bottom: 2rem;
    border: 1px solid var(--black);
}
.color:hover {
    opacity: 0.8;
}
.color:active {
    opacity: 0.6;
}
p {
    font-size: 1.5rem;
}
.mid {
    margin: 1rem 0;
}
</style>`;

export const Colors = () => (
    <Wrapper title="Colors" styles={styles}>
        <Grid as="ul" size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            {data.map(({ color, value, name }) => (
                <GridItem as="li" key={color + name}>
                    <button type="button" className="color" style={{ background: `var(${value})` }} />
                    <p className="color-name" data-color={value}>
                        {name}
                    </p>
                    <p className="mid">{value}</p>
                    <p>{color}</p>
                </GridItem>
            ))}
        </Grid>

        <div className="end" />
    </Wrapper>
);

Colors.play = async ({ canvasElement }: Record<'canvasElement', HTMLCanvasElement>) => {
    const list = canvasElement.querySelector('.grid');
    if (!list) return;

    const copyText = (element: HTMLDivElement): void => {
        if (!element) return;

        const colorName = element.innerText;
        copyToClipboard(element.dataset.color ?? '')
            .then(() => {
                element.innerText = 'copied!';
            })
            .catch(() => {
                element.innerText = 'error!';
            })
            .finally(() => {
                setTimeout(() => {
                    element.innerText = colorName;
                }, 400);
            });
    };

    list.addEventListener('click', (event: Event): void => {
        const target = event.target as HTMLDivElement;
        if (target.classList.contains('color')) {
            copyText(target.nextElementSibling as HTMLDivElement);
        }
    });
};
