export default (state = {
  interests: [],
  newsSources: []
}, action) => {
  switch (action.type) {
    case 'SET_INTERESTS_AND_NEWS_SOURCES':
      return {
        ...state,
        interests: action.interests,
        newsSources: action.newsSources
      }
    default:
      return {
        ...state
      }
  }
}