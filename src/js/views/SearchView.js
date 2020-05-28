import {elements} from './base';

export const getSearchInput = () => {
    return elements.searchInput.value;
}

export const clearView = () => {
    elements.searchInput.value = '';
}

export const clearSideList = () => {
    elements.sideDisplayList.innerHTML = '';
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="likes__link" href="#${recipe.recipe_id}">
                <figure class="likes__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${recipe.title}</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
    elements.sideDisplayList.insertAdjacentHTML('beforeend',markup);
}

const createButton = (page,type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type == 'prev'? page-1: page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type == 'prev'? 'left': 'right'}"></use>
        </svg>
        <span>Page ${type == 'prev'? page-1: page+1}</span>
    </button>
`;

const renderButtons = (page,counts,resultsPerPage) => {

    // clear existing buttons
    elements.paginationButton.innerHTML='';

    let pages = Math.ceil(counts/resultsPerPage);
    if(page === 1) {
        // show button to next page
        elements.paginationButton.insertAdjacentHTML("beforeend",createButton(page,'next'));  
    }
    else if(page === pages) {
        // shoe button to previous pag
        elements.paginationButton.insertAdjacentHTML("beforeend",createButton(page,'prev'));
    }
    else if(pages === 1){
        //show no buttons
    }
    else {
        // show both buttons
        elements.paginationButton.insertAdjacentHTML("beforeend",createButton(page,'prev'));
        elements.paginationButton.insertAdjacentHTML("beforeend",createButton(page,'next'));
    }
};

export const renderResults = (recipes,page = 1,resultsPerPage = 10) => {
    let start = (page - 1)*resultsPerPage;
    let end = start + resultsPerPage;
    recipes.slice(start,end).forEach(recipe => renderRecipe(recipe));
    renderButtons(page,recipes.length,resultsPerPage);
}