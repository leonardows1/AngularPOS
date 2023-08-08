export interface PurchaseProductDTO{
  purchaseProductId: string;
  productId: string;
  unitPrice: number;
  quantity: number;
}

export interface CreatePurchaseProductDTO extends Omit<PurchaseProductDTO, 'purchaseProductId'>{}
