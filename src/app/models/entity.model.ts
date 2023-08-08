export interface EntityDTO{
  entityId: string;
  indentificationType: object;
  identificationNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface CreateEntityDTO extends Omit<EntityDTO, 'entityId' | 'indentificationType'>{
  identificationTypeId: number;
}

export interface EntityPurchaseDTO extends Omit<EntityDTO, 'indentificationType'>{}

export interface EntitySaleDTO extends EntityPurchaseDTO{}
