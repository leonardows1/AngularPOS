import { EntityPurchaseDTO } from "./entity.model";
import { CreatePurchaseProductDTO, PurchaseProductDTO } from "./purchaseProduct.model";

export interface PurchaseDTO{
  purchaseId: string;
  purchaseDate: Date;
  number: number;
  letter: string;
  entity: EntityPurchaseDTO;
  purchaseProducts: PurchaseProductDTO[];
  isDonde: boolean;
  isCanceled: boolean;
}

export interface CreatePurchaseDTO extends
Omit<PurchaseDTO, 'purchaseId' | 'number' | 'letter' | 'entity' | 'purchaseProducts' | 'isDone' | 'isCanceled'>{
  purchaseDate: Date;
  entityId: string;
  purchaseProducts?: CreatePurchaseProductDTO[];
}
