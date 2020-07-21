import axios from 'axios'
import { setAlert } from './alert'

import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	DELETE_ACCOUNT,
	CLEAR_PROFILE,
} from './types'

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me')

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const res = await axios.post('/api/profile', JSON.stringify(formData), {
			headers: { 'Content-Type': 'application/json' },
		})

		dispatch({ type: GET_PROFILE, payload: res.data })

		dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'))

		if (!edit) {
			history.push('/dashboard')
		}
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const res = await axios.put(
			'/api/profile/experience',
			JSON.stringify(formData),
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)

		dispatch({ type: UPDATE_PROFILE, payload: res.data })

		dispatch(setAlert('Experience added', 'success'))

		history.push('/dashboard')
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const res = await axios.put(
			'/api/profile/education',
			JSON.stringify(formData),
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)

		dispatch({ type: UPDATE_PROFILE, payload: res.data })

		dispatch(setAlert('Education added', 'success'))

		history.push('/dashboard')
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`)

		dispatch({ type: UPDATE_PROFILE, payload: res.data })

		dispatch(setAlert('Experience Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`)

		dispatch({ type: UPDATE_PROFILE, payload: res.data })

		dispatch(setAlert('Education Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

export const deleteAccount = (id) => async (dispatch) => {
	if (window.confirm('Are you sure? This is undone later')) {
		try {
			const res = await axios.delete(`/api/profile/education/${id}`)

			dispatch({ type: CLEAR_PROFILE })
			dispatch({ type: DELETE_ACCOUNT })

			dispatch(setAlert('Your account has been deleted...'))
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}
	}
}
