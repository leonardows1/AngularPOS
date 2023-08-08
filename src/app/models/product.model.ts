import { CategoryDTO } from "./category.model";
import { ProductImageDTO } from "./productImage.model";

export interface ProductDTO{
  productId: string;
  code: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  category: CategoryDTO;
  productImages: ProductImageDTO[];
  isActive: boolean;
}

export interface CreateProductDTO extends Omit<ProductDTO, 'productId' | 'category'>{
  categoryId: string;
}

export interface UpdateProductDTO extends Omit<ProductDTO, 'category'>{
  categoryId: string;
}
