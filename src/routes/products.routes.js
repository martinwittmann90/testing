import express from 'express';
import { productsController } from '../controller/products.controller.js';
import { uploader } from '../utils.js';
import { checkProductPermissions } from '../middleware/auth.js';
export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getbyId);
productsRouter.post('/', uploader.single('thumbnail'), productsController.createOne);
productsRouter.put('/:id', checkProductPermissions, checkProductPermissions, productsController.updateOne);
productsRouter.delete('/:id', checkProductPermissions, checkProductPermissions, productsController.deleteOne);
productsRouter.get('/products/search', productsController.searchProducts);

export default productsRouter;
