export interface SaleProductDTO{
  purchaseProductId: string;
  productId: string;
  unitPrice: number;
  quantity: number;
}

export interface CreateSaleProductDTO extends Omit<SaleProductDTO, 'purchaseProductId'>{}
