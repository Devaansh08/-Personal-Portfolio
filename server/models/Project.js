import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['web design', 'applications', 'web development'],
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: '/devansh-profile.jpg',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      default: '#',
    },
    githubUrl: {
      type: String,
      default: '#',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
