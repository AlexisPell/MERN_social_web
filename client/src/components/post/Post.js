import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost } from './../../actions/post'
import Loader from './../layout/loader/Loader'
import PostItem from './../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id)
		//eslint-disable-next-line
	}, [])

	return loading || post === null ? (
		<Loader />
	) : (
		<>
			<Link to='/posts' className='btn'>
				Back to posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
