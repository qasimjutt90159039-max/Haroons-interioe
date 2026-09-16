import { projectRepository } from '../services/repository.js';

export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured;

    const projects = await projectRepository.findAll(filter);
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects.',
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectRepository.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found.`,
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project details.',
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      location,
      designStyle,
      materials,
      images,
      featured,
      isSample,
    } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and description are required fields.',
      });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one project image URL is required.',
      });
    }

    const projectData = {
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      location: location ? location.trim() : 'Lahore, Pakistan',
      designStyle: designStyle ? designStyle.trim() : 'Contemporary Luxury',
      materials: Array.isArray(materials) ? materials : (materials ? [materials] : []),
      images,
      featured: Boolean(featured),
      isSample: isSample !== undefined ? Boolean(isSample) : true,
    };

    const newProject = await projectRepository.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating project.',
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await projectRepository.update(id, updateData);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found.`,
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating project.',
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await projectRepository.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found.`,
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting project.',
    });
  }
};
