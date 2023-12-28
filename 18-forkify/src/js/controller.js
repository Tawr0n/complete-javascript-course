import * as model from './model'
import recipeView from "./views/recipeView";
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import {MODAL_CLOSE_SEC} from "./config";
import {getSearchResultsPage} from "./model";

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////////////////////////////////////////////

if (module.hot) {
    module.hot.accept()
}

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1)

        if (!id) return
        recipeView.renderSpinner()

        // 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage())

        // 1) Updating bookmarks view
        bookmarksView.update(model.state.bookmarks)

        // 2) Loading recipe
        await model.loadRecipe(id)

        // 3) Rendering recipe
        recipeView.render(model.state.recipe)
    } catch (e) {
        recipeView.renderError()
    }
};

const controlSearchResults = async function () {
    try {
        // 1) Get search query
        const query = searchView.getQuery()
        if (!query) return

        resultsView.renderSpinner()

        // 2) Load search results
        await model.loadSearchResults(query)

        // 3) Render results
        resultsView.render(model.getSearchResultsPage())

        // 4) Render initial pagination buttons
        paginationView.render(model.state.search)
    } catch (e) {
        console.log(e)
    }
}

const controlPagination = function (goToPage) {
    // 3) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage))

    // 4) Render NEW pagination buttons
    paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings)

    // Update the recipe view
    // recipeView.render(model.state.recipe)
    recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
    // 1) Add/remove bookmark
    if (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id)
    else model.addBookmark(model.state.recipe)

    // 2) Update recipe view
    recipeView.update(model.state.recipe)

    // 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks)
}


const controlAddRecipe = async function (newRecipe) {
    try {
        // Show loading spinner
        addRecipeView.renderSpinner()

        // Upload the new recipe data
        await model.uploadRecipe(newRecipe)
        console.log(model.state.recipe)

        // Render recipe
        recipeView.render(model.state.recipe)

        // Success message
        addRecipeView.renderMessage()

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`)
        // window.location.hash = model.state.recipe.id

        // Render bookmarks view
        bookmarksView.render(model.state.bookmarks)

        // Update results view
        resultsView.update(model.getSearchResultsPage())
    } catch (e) {
        console.error('💥', e)
        addRecipeView.renderError(e.message)
    }
}

const controlShowRecipeWindow = function () {
    addRecipeView.render(model.state.recipe)
}

const init = () => {
    bookmarksView.addHandlerRender(controlBookmarks)
    recipeView.addHandlerRender(controlRecipes)
    recipeView.addHandlerUpdateServings(controlServings)
    recipeView.addHandlerAddBookmark(controlAddBookmark)
    searchView.addHandlerSearch(controlSearchResults)
    paginationView.addHandlerClick(controlPagination)
    addRecipeView.addHandlerUpload(controlAddRecipe)
    addRecipeView.addHandlerShowWindow(controlShowRecipeWindow)
}
init()

