import { CategoryDTO } from "./category.model";
import { ProductImageDTO } from "./productImage.model";

export interface ProductDTO {
  productId: string;
  code: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  category: CategoryDTO;
  productImages: ProductImageDTO[];
  isActive: boolean;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<ProductDTO, 'taxes' | 'productId' | 'category'> {
  categoryId: string;
}

export interface UpdateProductDTO extends Omit<ProductDTO, 'taxes' | 'category'> {
  categoryId: string;
}

export interface UpdatePartialProductDTO extends Partial<UpdateProductDTO> {}
