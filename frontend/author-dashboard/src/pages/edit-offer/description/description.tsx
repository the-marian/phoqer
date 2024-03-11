import React, { useEffect } from 'react';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';

import classNames from 'classnames';
import { useFormikContext } from 'formik';

import { useQuillEditor } from 'src/hook/quill-editor.hook';
import { EditOfferForm } from 'src/pages/edit-offer/edit-offer.types';
import { ErrorText } from 'src/pages/new-offer/shared/error-text';

import css from './description.module.scss';

export const Description = (): JSX.Element => {
    const formik = useFormikContext<EditOfferForm>();
    const { content, ref, quill } = useQuillEditor(formik.values.description);

    useEffect(() => {
        const ref = quill.current;
        const handleChange = (): void => formik.setFieldValue('description', ref?.root.innerHTML);

        ref?.on('text-change', handleChange);
        return () => {
            ref?.off('text-change', handleChange);
        };
    }, [formik.setFieldValue, quill, formik]);

    return (
        <div className={css.root}>
            <div className={classNames(css.inner, formik.errors.description && css.inputError)}>
                <div
                    ref={ref}
                    tabIndex={0}
                    className={css.input}
                    dangerouslySetInnerHTML={{ __html: content.current as string }}
                />

                <ErrorText error={formik.errors.description} />
            </div>
        </div>
    );
};
