import React, { useState } from 'react';
import { ApiConnection } from '../connection/ApiConnection';

const Ingrediant = () => {
  const [ingrediants, setIngrediants] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {

    if(!ingrediants){
        return setError('please enter ingrediants')
    }
    try {
      setError('');
      const data = await ApiConnection(ingrediants);
      console.log('API Response:', data)
      if (data.results) {
        setRecipes(data.results);
      } else {
        setRecipes([]);
        setError('No recipes found. Try a different search!');
      }
    } catch (error) {
      setError(error.message);
      console.log('handleSearch: Error', error);
    }
  };

  return (
    <div className='ingrediant'>
      <h1>Search recipe form ingredients</h1>

      <div className='search-ingrediants'>
        <input
          type="text"
          onChange={(e) => setIngrediants(e.target.value)}
          value={ingrediants}
          placeholder='Enter ingredients ...'
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className='error-section'>{error}</div>

      <div className='recipe-response'>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <h1>{recipe.title}</h1>
              <img src={recipe.image} alt={recipe.title} />
            </div>
          ))
        ) : (
          <p>No recipes found. Try a different search!</p>
        )}
      </div>
    </div>
  );
};

export default Ingrediant;