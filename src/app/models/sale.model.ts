import { EntityDTO } from "./entity.model";
import { CreateSaleProductDTO, SaleProductDTO } from "./saleProduct.model";

export interface SaleDTO{
  saleId: string;
  saleDate: Date;
  number: number;
  letter: string;
  entity: EntityDTO;
  saleProducts: SaleProductDTO[];
  isDone: boolean;
  isCanceled: boolean;
}

export interface CreateSaleDTO{
  saleDate: Date;
  entityId: string;
  saleProducts?: CreateSaleProductDTO[];
}
