import { CHANGE_PRIMARY, CHANGE_SECONDARY } from './actionTypes'

export const changePrimary = (newColor: string) => ({
  type: CHANGE_PRIMARY,
  payload: newColor,
})
export const changeSecondary = (newColor: string) => ({
  type: CHANGE_SECONDARY,
  payload: newColor,
})
