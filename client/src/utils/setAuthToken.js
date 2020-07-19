import axios from 'axios'

// If there is a token in a localStorage, always send that

// If token is there, add it to the globalHeaders, if not - delete it
const setAuthToken = (token) => {
	// Check if token in local storage
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token
	} else {
		delete axios.defaults.headers.common['x-auth-token']
	}
}

export default setAuthToken
