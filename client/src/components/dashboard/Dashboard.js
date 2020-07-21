import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'

import Loader from '../layout/loader/Loader'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({
	profile: { profile, loading },
	auth: { user },
	getCurrentProfile,
	deleteAccount,
}) => {
	useEffect(() => {
		getCurrentProfile()
		//eslint-disable-next-line
	}, [])

	return loading && profile === null ? (
		<Loader />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome, {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='my-2'>
						<button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minus'></i> Delete My account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile, wish to add some info?</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	)
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
)
