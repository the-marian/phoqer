import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';

import Quill from 'quill';
import { useTranslation } from 'react-i18next';

interface QuillEditorType {
    error: string;
    content: RefObject<string>;
    ref: RefObject<HTMLDivElement>;
    quill: RefObject<Quill>;
    setError: Dispatch<SetStateAction<string>>;
}
export const useQuillEditor = (initialValue = ''): QuillEditorType => {
    const { t } = useTranslation();
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
                placeholder: t('Start typing ...'),
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ header: 1 }, { header: 2 }],
                        [
                            {
                                color: [
                                    'var(--white)',
                                    'var(--gray-5)',
                                    'var(--gray-6)',
                                    'var(--gray-7)',
                                    'var(--gray-9)',
                                    'var(--black)',
                                    'var(--success)',
                                    'var(--red)',
                                    'var(--primary-1)',
                                    'var(--primary-2)',
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
    }, [t]);

    return { content, ref, quill, error, setError };
};
