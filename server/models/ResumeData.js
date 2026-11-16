import mongoose from 'mongoose';

const resumeDataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'My Professional Resume',
      trim: true,
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      jobTitle: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      summary: { type: String, default: '' },
    },
    education: [
      {
        institution: String,
        degree: String,
        year: String,
        details: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        period: String,
        description: String,
      },
    ],
    skills: [
      {
        name: String,
        level: Number,
      },
    ],
    projects: [
      {
        title: String,
        link: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ResumeData = mongoose.model('ResumeData', resumeDataSchema);

export default ResumeData;
