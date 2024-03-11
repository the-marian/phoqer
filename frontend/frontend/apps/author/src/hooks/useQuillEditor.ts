import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';

import Quill from 'quill';

interface QuillEditorType {
    error: string;
    content: RefObject<string>;
    ref: RefObject<HTMLDivElement>;
    quill: RefObject<Quill>;
    setError: Dispatch<SetStateAction<string>>;
}
export const useQuillEditor = (initialValue = ''): QuillEditorType => {
    const ref = useRef<HTMLDivElement>(null);
    const quill = useRef<Quill | null>(null);

    const content = useRef<string>(initialValue);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleResetError = (): void => {
            setError('');
        };

        if (ref.current && !quill.current) {
            quill.current = new Quill(ref.current, {
                theme: 'bubble',
                placeholder: 'Start typing ...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ header: 2 }, { header: 3 }],
                        [
                            {
                                color: [
                                    'var(--chakra-colors-common-black)',
                                    'var(--chakra-colors-common-white)',
                                    'var(--chakra-colors-gray-400)',
                                    'var(--chakra-colors-gray-500)',
                                    'var(--chakra-colors-gray-600)',
                                    'var(--chakra-colors-green-600)',
                                    'var(--chakra-colors-red-500)',
                                    'var(--chakra-colors-blue-500)',
                                ],
                            },
                            { list: 'ordered' },
                            { list: 'bullet' },
                        ],
                        [{ indent: '-1' }, { indent: '+1' }],
                        ['clean'],
                    ],
                },
            });

            quill.current?.on('text-change', handleResetError);
        }

        return () => {
            quill.current?.off('text-change', handleResetError);
        };
    }, []);

    return { content, ref, quill, error, setError };
};
