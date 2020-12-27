import { Action } from 'redux'
import produce, { Draft } from 'immer'
import { colors } from '../utils/colors'
import { CHANGE_PRIMARY, CHANGE_SECONDARY } from './actionTypes'

export interface State {
  readonly primary: string
  readonly secondary: string
}
const initialState: State = {
  primary: colors.primaryDark,
  secondary: colors.secondary,
}
interface ColorAction extends Action<string> {
  payload: string
}

export const colorReducer = (state = initialState, action: ColorAction): State =>
  produce(state, (draft: Draft<State>) => {
    switch (action.type) {
      case CHANGE_PRIMARY:
        draft.primary = action.payload
        break
      case CHANGE_SECONDARY:
        draft.secondary = action.payload
        break
    }
  })
