import React, { useState } from 'react';
import { ApiConnection } from '../connection/ApiConnection';
import '../css/Ingrediant.css'

const Ingrediant = () => {
  const [ingrediants, setIngrediants] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [isSearched,setIsSearched] = useState(false)

  const handleSearch = async () => {

    if(!ingrediants){
        return setError('please enter ingrediants')
    }
    try {
      setIsSearched(true)
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
      setIsSearched(false)
      setError(error.message);
      console.log('handleSearch: Error', error);
    }
  };

  return (
    <div className='ingrediant'>
      <h1>Search recipe from ingredients</h1>

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
        {isSearched && recipes.length == 0 ? (
            <p>No recipes found. Try a different search!</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className='single-recipe'> 
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ingrediant;