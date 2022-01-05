/** initialise our theme state from local storage */
const initialState = {
	user: null,
	  profile: null
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
		  case "setProfile":
			  return {
				  ...state,
				  profile: action.payload,
			  };
	  break;
  
  
		  
	}
  }
  
  export default { reducer, initialState };