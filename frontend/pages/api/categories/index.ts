import categories from '../../../utils/categories';

export default (req, res) => {
  res.status(200).json(categories);
};
