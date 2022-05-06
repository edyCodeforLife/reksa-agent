import {HandleError, IResponseSuccess} from '../../services/error/response';
import {IProductDataService, ProductDataService} from '../../services/product/product';

export interface IProductService {
  GetUserProductBank(id: number, handler: IResponseSuccess);
  GetProductDetail(id: number, handler: IResponseSuccess);
}

export class ProductService implements IProductService  {
  private _product: IProductDataService;

  constructor() {
    this._product = new ProductDataService();
  }

  async GetUserProductBank(id: number, handler: IResponseSuccess) {
    try {
      let data = await this._product.ProductBank(id);
      return await handler.Success(data);
    } catch(e) {
      await HandleError(e, handler);
    }
  }

  async GetProductDetail(id: number, handler: IResponseSuccess) {
    try {
      let res = await this._product.ProductDetail(id);
      return await handler.Success(res.data);
    } catch(e) {
      await HandleError(e, handler);
    }
  }
}