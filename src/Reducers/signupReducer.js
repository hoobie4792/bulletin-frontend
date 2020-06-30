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
      let selectedSources = [...state.selectedSources]
      selectedSources.splice(selectedSources.findIndex(source => source === action.source), 1)
      return {
        ...state,
        selectedSources: selectedSources
      };
    case 'ADD_INTEREST':
      return {
        ...state,
        selectedInterests: [...state.selectedInterests, action.interest]
      };
    case 'REMOVE_INTEREST':
      let selectedInterests = [...state.selectedInterests]
      selectedInterests.splice(selectedInterests.findIndex(interest => interest === action.interest), 1)
      return {
        ...state,
        selectedInterests: selectedInterests
      };
    default:
      return state
  }
}