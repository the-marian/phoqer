import express from 'express';
import { addContent, getContent, updateContent, deleteContent } from './translations.controller';

const router = express.Router();

router.get('/:lang', getContent);
router.put('/:lang', updateContent);
router.post('/', addContent);
router.delete('/:id', deleteContent);

export default router;
