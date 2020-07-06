export default (state = {
  sources: [],
  interests: [],
  selectedSources: [],
  selectedInterests: []
}, action) => {
  switch (action.type) {
    case 'SET_SOURCES':
      return {
        ...state,
        sources: action.sources
      }
    case 'SET_INTERESTS':
      return {
        ...state,
        interests: action.interests
      }
    case 'ADD_SOURCE':
      return {
        ...state,
        selectedSources: [...state.selectedSources, action.source]
      };
    case 'REMOVE_SOURCE':
      return {
        ...state,
        selectedSources: [...state.selectedSources].filter(source => source !== action.source)
      };
    case 'ADD_INTEREST':
      return {
        ...state,
        selectedInterests: [...state.selectedInterests, action.interest]
      };
    case 'REMOVE_INTEREST':
      return {
        ...state,
        selectedInterests: [...state.selectedInterests].filter(interest => interest !== action.interest)
      };
    default:
      return state
  }
}