import express from 'express';
import multer from 'multer';
import { extractScreenTimeFromBuffer } from '../services/ocr.js';
import { analyzeScreenTime } from '../services/claude.js';
import { QuestionnaireData } from '../types/index.js';

const router = express.Router();

// PRIVACY: Using memory storage - files are NEVER written to disk
// Images exist only in RAM during processing and are automatically
// garbage collected after the request completes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// OCR endpoint - extracts screen time data from screenshot
// PRIVACY: Image is processed in memory, sent to Claude API, then discarded
// No data is stored or logged
router.post('/ocr', upload.single('screenshot'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process image in memory - buffer is automatically freed after response
    const data = await extractScreenTimeFromBuffer(req.file.buffer, req.file.mimetype);

    // Return extracted data - image buffer is now eligible for garbage collection
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
