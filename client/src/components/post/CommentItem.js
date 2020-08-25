import React from 'react'
import { connect } from 'react-redux'
import { deleteComment } from './../../actions/post'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const CommentItem = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment,
}) => {
	return (
		<div className='post bg-white p-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={() => deleteComment(postId, _id)}
						type='button'
						className='btn btn-danger'
					>
						<i className='fas fa-times' />
					</button>
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
