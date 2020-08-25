import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPosts } from './../../actions/post'
import Loader from './../layout/loader/Loader'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { loading, posts } }) => {
	useEffect(() => {
		getPosts()
		//eslint-disable-next-line
	}, [])

	return loading ? (
		<Loader />
	) : (
		<>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the community
			</p>
			<PostForm />
			<div className='posts'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	post: state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts)
