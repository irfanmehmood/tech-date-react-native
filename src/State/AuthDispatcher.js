/** initialise our theme state from local storage */
const initialState = {
  user: null
};

/** Our dispatcher reducer */
function reducer(state, action) {

  switch (action.type) {
		case "userLoggedIn":
			return {
				...state,
				user: action.payload,
			};
    break;
  }
}

export default { reducer, initialState };