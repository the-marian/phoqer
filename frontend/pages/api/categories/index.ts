import { NextApiRequest, NextApiResponse } from 'next';

import categories from '../../../utils/categories';

export default (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json(categories);
};
