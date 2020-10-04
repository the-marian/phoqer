import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    margin: theme.rem(20, 0, 30),
  },
  img: {
    height: theme.rem(75),
    objectFit: 'cover',
  },
  title: {
    textTransform: 'uppercase',
    margin: theme.rem(10, 0, 5),
    textAlign: 'center',
    fontSize: theme.rem(2),
    fontWeight: theme.text.weight[3],
  },
  content: {
    width: '60%',
    margin: '0 auto',
  },
  text: {
    margin: theme.rem(3, 0),
    fontSize: theme.rem(1.4),
    textAlign: 'center',
  },
}));

const About = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.wrp}>
      <img className={css.img} src="/about.jpg" alt="about" />

      <h2 className={css.title}>fucking project</h2>
      <div className={css.content}>
        <p className={css.text}>
          Ты – это то, что тебя окружает. Мы полностью согласны с этой фразой.
          Вещи, которые мы покупаем, формируют человека. Иногда одна простая
          вещь может сделать нас по-настоящему счастливыми.
        </p>
        <p className={css.text}>
          Поэтому мы собрали самые разные товары у нас на сайте, чтобы каждый
          смог найти желаемое. Легко. Быстро. По приемлемой цене и хорошего
          качества.
        </p>
        <p className={css.text}>
          Мы захотели создать что-то лучше, чем обычный супермаркет, где мы
          ходим с тележкой среди прилавков, в надежде найти конкретную вещь.
          Онлайн-шоппинг избавляет нас от многих неудобств. Здесь не придется
          стоять в очереди на кассе, а под конец выяснить, что оплата только
          наличкой. Ваш ребенок не потеряется где-то в рядах с игрушками, а вам
          не придется с виноватым видом говорить консультанту, что хотели
          «просто посмотреть».
        </p>
      </div>
    </div>
  );
};

export default About;
