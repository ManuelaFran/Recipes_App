import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import SearchContext from '../context/SearchContext';
import CategoriesBtns from './CategoriesBtns';
import { getStartRecipes, getReceipesCategories } from '../servicesAPI/requests';

function Recipes() {
  const { apiResponse,
    setApiResponse,
    setCategoriesBtnFilters,
  } = useContext(SearchContext);
  const location = useLocation();

  const setCategory = () => {
    const { pathname } = location;
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    return returnedCategory[0];
  };

  const recipesCategory = setCategory();

  useEffect(() => {
    const setRecipes = async () => {
      const recipes = await getStartRecipes(recipesCategory);
      setApiResponse(recipes);
    };
    setRecipes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const setCategories = async () => {
      const categories = await getReceipesCategories(recipesCategory);

      setCategoriesBtnFilters(categories);
    };
    setCategories();
  }, []);

  const maximumReceipes = 12;

  return (
    <main>
      <CategoriesBtns />
      <section>
        {
          apiResponse?.map((recipe, index) => (
            (index < maximumReceipes) && <Card
              key={ index }
              isMeal={ recipesCategory === 'foods' }
              index={ index }
              recipeData={ recipe }
            />))
        }
      </section>
    </main>
  );
}

export default Recipes;
