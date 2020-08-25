import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfiles } from './../../actions/profile'
import Loader from './../layout/loader/Loader'
import ProfileItem from './ProfileItem'

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
	useEffect(() => {
		getProfiles()
	}, [getProfiles])

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop' /> Browse and connect with
						developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>Loading profiles...</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
