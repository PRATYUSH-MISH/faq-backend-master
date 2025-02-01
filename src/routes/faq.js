const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const { client } = require('../db/connect');
const { translateText } = require('../services/translate');

// Fetch all FAQs with optional language filter
router.get('/', async (req, res) => {
  try {
    const language = req.query.lang || 'en';
    const cacheKey = `faq_list:${language}`;

    // Attempt to fetch from Redis cache
    const cachedFAQs = await client.get(cacheKey);
    if (cachedFAQs) {
      return res.json(JSON.parse(cachedFAQs));
    }

    // Retrieve data from MongoDB
    const faqs = await FAQ.find();
    const formattedFAQs = faqs.map(faq => ({
      ...faq.getLocalizedFAQ(language),
      id: faq._id,
    }));

    // Store in cache for 60 minutes
    await client.setEx(cacheKey, 3600, JSON.stringify(formattedFAQs));

    res.json(formattedFAQs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new FAQ with automated translations
router.post('/', async (req, res) => {
  try {
    const { query, response } = req.body;
    const newFAQ = new FAQ({ query, response });

    // Auto-translate content
    const supportedLanguages = ['hi', 'bn'];
    for (const lang of supportedLanguages) {
      const translatedQuery = await translateText(query, lang);
      const translatedResponse = await translateText(response, lang);
      newFAQ.localizedContent.push({ languageCode: lang, query: translatedQuery, response: translatedResponse });
    }

    await newFAQ.save();

    // Clear all related cache keys
    const cacheKeys = await client.keys('faq_list:*');
    if (cacheKeys.length) await client.del(cacheKeys);

    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modify an existing FAQ
router.put('/:id', async (req, res) => {
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Remove outdated cache entries
    const cacheKeys = await client.keys('faq_list:*');
    if (cacheKeys.length) await client.del(cacheKeys);

    res.json(updatedFAQ);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove an FAQ entry
router.delete('/:id', async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);

    // Invalidate stored cache
    const cacheKeys = await client.keys('faq_list:*');
    if (cacheKeys.length) await client.del(cacheKeys);

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
