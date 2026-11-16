import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Devansh Kumar',
    },
    title: {
      type: String,
      default: 'Web developer',
    },
    avatar: {
      type: String,
      default: '/devansh-profile.jpg',
    },
    email: {
      type: String,
      default: 'devansh31k@gmail.com',
    },
    phone: {
      type: String,
      default: '+91 8887831905',
    },
    birthday: {
      type: String,
      default: 'August 31, 2003',
    },
    location: {
      type: String,
      default: 'Lucknow, Uttar Pradesh, India',
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com/Devaansh08' },
      linkedin: { type: String, default: 'https://linkedin.com/' },
      twitter: { type: String, default: 'https://twitter.com/' },
      instagram: { type: String, default: 'https://instagram.com/' },
      facebook: { type: String, default: 'https://facebook.com/' },
    },
    aboutParagraphs: {
      type: [String],
      default: [
        "I'm a passionate and detail-oriented web developer embarking on my professional journey, I bring a fresh perspective, a hunger for learning, and a solid foundation in modern web technologies. I enjoy turning complex problems into simple, beautiful and intuitive designs.",
        "My job is to build your website so that it is functional and user-friendly but at the same time attractive. Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring across your message and identity in the most creative way."
      ],
    },
    services: [
      {
        title: String,
        description: String,
        icon: String,
      },
    ],
    education: [
      {
        institution: String,
        period: String,
        degree: String,
        details: String,
      },
    ],
    experience: [
      {
        title: String,
        period: String,
        description: String,
      },
    ],
    skills: [
      {
        name: String,
        percentage: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
