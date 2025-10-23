const express = require('express');
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', protect, admin, upload.single('image'), createCourse);
router.put('/:id', protect, admin, upload.single('image'), updateCourse);
router.delete('/:id', protect, admin, deleteCourse);

module.exports = router;