export interface CategoryDTO{
  categoryId: string;
  name: string;
}

export interface CreateCategoryDTO extends Omit<CategoryDTO, 'categoryId'>{}
