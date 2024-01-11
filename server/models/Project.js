import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			unique: true,
		},
		shortDescription: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		imageUrl: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Project', ProjectSchema)
