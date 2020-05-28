import Search from './models/Search';
import * as searchView from './views/SearchView';
import {elements, renderLoader,clearLoader} from './views/base';
import Recipe from './models/Recipe';

/* global state of the app
* - Search object
* - current recipe object
* - shopping list object
* - liked recipes
*/ 
const state = {};

const controlSearch = async () => {
    // get the query from the view
    const query = searchView.getSearchInput();
    if(query) {
        // new search object and add it to state
        state.search = new Search(query);

        // prepare the user interface for result
        searchView.clearSideList();
        renderLoader(elements.searchTab);

        // search for recipes
        await state.search.getSearchResults();

        // render results on ui
        clearLoader();
        let recipes = state.search.result;
        searchView.renderResults(recipes.data.recipes);
    
        // clear the input
        searchView.clearView();
    }
}


elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

elements.paginationButton.addEventListener('click',e => {
    const button = e.target.closest('.btn-inline');
    if(button) {
        const goToPage = parseInt(button.dataset.goto,10);
        searchView.clearSideList();
        let recipes = state.search.result;
        searchView.renderResults(recipes.data.recipes,goToPage);
    }
   
})

const getRecipe = async () => {

    // get hash id from the page
    let id = window.location.hash.split('#')[1];

    if(id) {
        console.log(id);
        // create a recipe object
        state.recipe = new Recipe(id);

        // get the recipe data
        try {
            await state.recipe.getRecipe();
        
            state.recipe.calcTime();
            state.recipe.servings();
            
            // render the recipe on ui
            console.log(state.recipe);

        } catch(error) {
            alert(`error processing recipe ${error}`);
        }
        
    }

}



window.addEventListener('hashchange', getRecipe);
window.addEventListener('load', getRecipe);