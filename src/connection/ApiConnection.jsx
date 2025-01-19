const ApiKey = process.env.REACT_APP_RECIPE_API_KEY;
const baseUrl = 'https://api.spoonacular.com/recipes';

export const ApiConnection = async (ingredients) => {
  try {
    const url = `${baseUrl}/complexSearch?apiKey=${ApiKey}&query=${ingredients}`
    
    const res = await fetch(url);
    if (!res.ok) {
      console.log('API key :', ApiKey)
      console.log('url : ' ,url)
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in fetch API:', error.message);
    throw error;
  }
};