// @flow

import { actions } from 'react-redux-form'

import { fetch } from 'rest'

import { RECIPE_CREATE_SUCCESS, RECIPE_CREATE_FAIL } from './constants'
import { modelName } from './utils'

import type { RecipeForm, Recipe } from 'types'

const recipeCreated = (recipe: Recipe) => ({
  type: RECIPE_CREATE_SUCCESS,
  payload: recipe,
})

const recipeCreationFailed = error => ({
  type: RECIPE_CREATE_FAIL,
  payload: error,
})

const resetForm = () => actions.reset(modelName())

export const create = (recipe: RecipeForm) => {
  return (dispatch: Dispatch) => {
    const url = '/recipes'
    const method = 'POST'
    const data = { recipe }

    return fetch(url, { method, data })
      .then(response => dispatch(recipeCreated(response.data)))
      .then(() => dispatch(resetForm())) //todo go to recipe list
      .catch(error => dispatch(recipeCreationFailed(error.response.data)))
  }
}
