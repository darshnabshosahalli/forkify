import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        }
        catch(error) {
            console.log(error);
        }
    }

    calcTime() {
        
        let numberIngredients = this.ingredients.length;
        let perios = numberIngredients / 3;
        this.time = perios * 15;
    }

    servings() {
        this.servings = 4;
    }

    calcRecipe() {
        
    }
}