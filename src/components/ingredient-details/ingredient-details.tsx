import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '@slices';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id: ingredientId } = useParams();

  const ingredients = useSelector(getIngredientsSelector);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
