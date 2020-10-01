import React from 'react';
import { createUseStyles, useTheme, ThemeProvider } from 'react-jss';
import { Theme } from '../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  header: {
    width: '100%',
    padding: theme.box.two(3, 4),
    background: theme.palette.gray,
  },
}));

const Header = () => {
  const css = useStyles();
  return (
    <header className={css.header}>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ea
        excepturi eaque sint amet odit est atque. Tenetur nemo laborum, ratione
        dolores, corrupti ut at quis dolorem eius illum neque?
      </div>
    </header>
  );
};

export default Header;
