import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { extractScreenTimeFromImage } from '../services/ocr.js';
import { analyzeScreenTime } from '../services/claude.js';
import { QuestionnaireData } from '../types/index.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// OCR endpoint
router.post('/ocr', upload.single('screenshot'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = await extractScreenTimeFromImage(req.file.path);

    // Clean up uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json(data);
  } catch (error) {
    console.error('OCR error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    const data: QuestionnaireData = req.body;

    // Validate required fields
    if (!data.screenTimeData || !data.dreamGoal || !data.changeSeriousness) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await analyzeScreenTime(data);
    res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze data' });
  }
});

export default router;
