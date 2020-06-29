export default (state = {
  posts: []
}, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.posts
      };
    case 'CREATE_NEW_POST':
      const posts = [...state.posts]
      posts.unshift(action.post)
      return {
        ...state,
        posts: posts
      }
    default:
      return state;
  }
}