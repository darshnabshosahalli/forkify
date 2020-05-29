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

    parseIngredients() {

        const unitsLong = ['tablespoons','tablespoon', 'ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound','g','kg'];

        const newIngredients = this.ingredients.map(el => {

            // uniform units
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });

            // remove prarentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g," ");

            // parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');

            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;

            if(unitIndex > -1) {

                let arrCount = arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-','+'));
                } else {
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }

                objIng = {
                    count: count,
                    unit: arrIng.slice(unitIndex,unitIndex+1).join(' '),
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }
            }
            else if(parseInt(arrIng[0],10)) {
                objIng = {
                    count: eval(parseInt(arrIng[0],10)),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
            else if(unitIndex === -1) {
                objIng = {
                    count: eval(1),
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {

        const newServings = type === 'dec'? this.servings - 1: this.servings + 1;
        this.ingredients.forEach(el => {
            el.count = el.count *(newServings/this.servings);
        })
        this.servings = newServings;
    }
}