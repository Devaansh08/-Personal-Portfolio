import express from 'express';
import Project from '../models/Project.js';
import Message from '../models/Message.js';
import Profile from '../models/Profile.js';
import ResumeData from '../models/ResumeData.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET profile data
router.get('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
});

// UPDATE profile data
router.put('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// GET all projects (supports category filter)
router.get('/projects', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category.toLowerCase() !== 'all') {
      query.category = category.toLowerCase();
    }
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// GET single project
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// POST new project
router.post('/projects', async (req, res) => {
  try {
    const { title, category, description, techStack, liveUrl, githubUrl, image, featured, order } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Title, category, and description are required' });
    }

    const newProject = await Project.create({
      title,
      category: category.toLowerCase(),
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      liveUrl: liveUrl || '#',
      githubUrl: githubUrl || '#',
      image: image || '/devansh-profile.jpg',
      featured: Boolean(featured),
      order: Number(order) || 0,
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
});

// PUT update project
router.put('/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
});

// DELETE project
router.delete('/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

// POST contact message
router.post('/contact', async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    if (!fullname || !fullname.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const savedMessage = await Message.create({
      fullname: fullname.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.',
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit message. Please try again later.',
      error: error.message,
    });
  }
});

// GET all contact messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error: error.message });
  }
});

// RESUME BUILDER ENDPOINTS:
// GET all saved resumes
router.get('/resumes', async (req, res) => {
  try {
    const resumes = await ResumeData.find().sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error: error.message });
  }
});

// GET single resume by id
router.get('/resumes/:id', async (req, res) => {
  try {
    const resume = await ResumeData.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error: error.message });
  }
});

// POST save a resume
router.post('/resumes', async (req, res) => {
  try {
    const newResume = await ResumeData.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Resume saved to cloud successfully!',
      data: newResume,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to save resume',
      error: error.message,
    });
  }
});

// PUT update resume
router.put('/resumes/:id', async (req, res) => {
  try {
    const updated = await ResumeData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({
      success: true,
      message: 'Resume updated successfully!',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating resume', error: error.message });
  }
});

export default router;
