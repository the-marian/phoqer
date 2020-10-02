import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({}));

const Socials = (): ReactElement => {
  return (
    <div>
      <h3>Социальные сети:</h3>
      <ul>
        <li>
          <a
            href="http://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            google
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
