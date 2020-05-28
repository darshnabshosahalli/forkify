export const elements = {
    searchInput: document.getElementById('search-input'),
    searchButton: document.getElementById('searchBtn'),
    sideDisplayList: document.getElementById('side-list'),
    searchTab: document.getElementById('result-tab'),
    paginationButton: document.getElementById('pagination')
}

export const queryStrings = {
    loader: "loader"
}

export const renderLoader = parent => {

    const loader = `
        <div class="${queryStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${queryStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}