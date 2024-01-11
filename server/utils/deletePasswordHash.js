export default item => {
	const { user, ...rest } = item._doc
	if (user) {
		const {
			passwordHash,
			createdAt,
			updatedAt,
			email,
			...userWithoutPasswordHash
		} = user._doc
		return {
			...rest,
			user: userWithoutPasswordHash,
		}
	}
	return item
}
