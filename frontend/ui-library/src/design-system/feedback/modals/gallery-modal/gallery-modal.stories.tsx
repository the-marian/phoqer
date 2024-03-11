import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Image } from 'src/design-system/media/image/image';
import { Wrapper } from 'src/storybook/wrapper';

import { GalleryModal } from './gallery-modal';

const meta: Meta<typeof GalleryModal> = {
    title: 'Feedback/Modals',
    component: GalleryModal,
};

export default meta;

const styles = `<style>
td { 
    width: 50%;
    vertical-align: top;
}
.button {
    height: 10rem;
    width: 10rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    border: 0.2rem solid transparent;
}
.button:hover {
    border: 0.2rem solid var(--primary-blue-500);
}
.img {
    height: 100%;
    width: 100%;
}
</style>`;

const media1 = [
    'https://images.unsplash.com/photo-1635713601835-023b8fbb3b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80',
    'https://images.unsplash.com/photo-1650980097217-c04a1f25d0d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1650918001938-2d26c9ae55bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1649669847212-2074f5a22885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2169&q=80',
    'https://images.unsplash.com/photo-1650960865643-eeecde3203d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    'https://images.unsplash.com/photo-1650909085203-9205d767fd3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1650918061166-88d338d63cd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80',
    'https://images.unsplash.com/photo-1650671061393-a144406793c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1650790177141-ed35baca7a18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80',
    'https://images.unsplash.com/photo-1650694558186-ec904d29ec2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80',
    'https://images.unsplash.com/photo-1650922531558-c5afe1e2b4f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1650915296379-4432f4fb8612?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1650917789210-6c23517c4b95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
    'https://images.unsplash.com/photo-1650940826212-f384698b71ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
];

const media2 = [
    'https://images.unsplash.com/photo-1650868450266-325472a4e7cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80',
];

export const Gallery = () => {
    const [first, setFirst] = useState<number | null>(null);
    const [second, setSecond] = useState<number | null>(null);

    return (
        <Wrapper title="Gallery Modal" styles={styles}>
            <h2 className="subheading">Gallery Modal</h2>
            <table>
                <thead>
                    <tr>
                        <td>Gallery</td>
                        <td>Single</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {media1.map((item, index) => (
                                <button className="button" key={item} type="button" onClick={() => setFirst(index)}>
                                    <Image className="img" src={item} alt="" />
                                </button>
                            ))}
                        </td>
                        <td>
                            {media2.map((item, index) => (
                                <button className="button" key={item} type="button" onClick={() => setSecond(index)}>
                                    <Image className="img" src={item} alt="" />
                                </button>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>

            {typeof first === 'number' ? <GalleryModal onClose={() => setFirst(null)} media={media1} index={first} /> : null}
            {typeof second === 'number' ? <GalleryModal onClose={() => setSecond(null)} media={media2} index={second} /> : null}
        </Wrapper>
    );
};
