import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		text: {
			type: String,
			required: true,
		},
		imageUrl: String,
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Task', TaskSchema)
