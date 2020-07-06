export default (state = {
  posts: []
}, action) => {
  switch (action.type) {
    case 'GET_INTERESTS_POSTS':
      return {
        posts: action.posts
      }
    default:
      return state
  }
}