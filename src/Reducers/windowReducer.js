export default (state = {
  window: 'home'
}, action) => {
  switch (action.type) {
    case "SET_WINDOW":
      return {
        ...state,
        window: action.window
      }
    default:
      return state
  }
}