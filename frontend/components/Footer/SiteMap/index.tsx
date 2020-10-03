import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const LINKS: { text: string; href: string }[] = [
  {
    text: 'Помощь и Обратная связь',
    href: '/help',
  },
  {
    text: 'Реклама на сайте',
    href: '/ad',
  },
  {
    text: 'Условия использования',
    href: '/rules',
  },
  {
    text: 'Политика конфиденциальности',
    href: '/polici',
  },
  {
    text: 'FAQ',
    href: '/faq',
  },
  {
    text: 'Правила безопасности',
    href: '/fff',
  },
  {
    text: 'Карта сайта',
    href: '/map',
  },
];

const useStyles = createUseStyles((theme: Theme) => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '75%',
  },
  item: {
    display: 'block',
    width: '50%',
  },
  link: {
    display: 'block',
    fontSize: theme.rem(1.2),
    fontWeight: theme.text.weight[3],
    color: theme.text.color.black,
    lineHeight: 4,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const SiteMap = (): ReactElement => {
  const css = useStyles();
  return (
    <ul className={css.list}>
      {LINKS.map(({ text, href }) => (
        <li key={href} className={css.item}>
          <Link href={href}>
            <a className={css.link}>{text}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SiteMap;
