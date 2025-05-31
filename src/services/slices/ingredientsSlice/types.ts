import { TIngredient } from '@utils-types';

export interface ingredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | null;
}
