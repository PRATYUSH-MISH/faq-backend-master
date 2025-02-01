const mongoose = require('mongoose');

// Schema for translations
const localizedSchema = new mongoose.Schema({
    languageCode: {
        type: String,
        required: true,
        enum: ['en', 'hi', 'bn']
    },
    query: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
}, { _id: false });

// Main FAQ Schema
const faqSchema = new mongoose.Schema({
    // Primary fields (default English)
    query: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    // Translations stored as an array
    localizedContent: [localizedSchema]
});

// Method to retrieve translated FAQ
faqSchema.methods.getLocalizedFAQ = function (lang = 'en') {
    const matchedTranslation = this.localizedContent.find(item => item.languageCode === lang);
    
    return matchedTranslation || { query: this.query, response: this.response };
};

module.exports = mongoose.model('FAQ', faqSchema);
