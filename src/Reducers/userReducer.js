export default (state = {
  user: {}
}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'UPDATE_FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: action.following
        }
      }
    case 'UPDATE_USER_POSTS':
      const updatePosts = [...state.user.posts];
      return {
        ...state,
        user: {
          ...state.user,
          posts: updatePosts.map(post => {
            if (post.id === action.post.id) {
              return action.post;
            } else {
              return post;
            }
          })
        }
      }
    default:
      return state;
  }
}