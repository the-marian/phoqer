import { useTranslation } from 'react-i18next';
import { NavigateOptions, To, useNavigate as useNav } from 'react-router-dom';

type NavigateFunction = (to: To, options?: NavigateOptions) => void;
export const useNavigate = (): NavigateFunction => {
    const navigate = useNav();
    const { i18n } = useTranslation();

    return (to, options) => {
        if (typeof to !== 'string') {
            navigate(to, options);
            return;
        }

        const path = to[0] === '/' ? to.slice(1) : to;
        navigate(`/${i18n.language}/${path}`, options);
    };
};
