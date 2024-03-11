import { FC } from 'react';

import { Text } from 'src/design-system/foundation/text';

interface Props {
    count?: number;
}
export const LongText: FC<Props> = ({ count = 1 }) => {
    return (
        <>
            {[...Array(count)].map((_, index) => (
                <Text key={index}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur debitis, delectus deleniti dignissimos
                    ea eos error et expedita labore nesciunt odit quas repellat reprehenderit repudiandae sint sit, temporibus
                    ullam. At aut cumque facilis iusto, magni non quas tenetur! Ab adipisci animi aperiam architecto blanditiis
                    delectus deleniti dolorem earum illum inventore ipsam laborum libero minima molestias porro qui quia, quisquam
                    quos rem repellat sed sequi animi, architecto aspernatur delectus dolores eius eveniet facere facilis fugiat
                    illo laborum laudantium maiores minima, minus non nulla quam quasi quos repudiandae sapiente tenetur veniam.
                </Text>
            ))}
        </>
    );
};
