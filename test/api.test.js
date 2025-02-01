const { expect, app } = require('./setup');  
const FAQ = require('../src/models/FAQ');   

describe('FAQ API', () => {  // Test suite for FAQ API
  describe('GET /api/faqs', () => {  // Test case for the GET endpoint to fetch FAQs
    it('should fetch FAQs in English (default)', async () => {
      // Creating a test FAQ entry in the database
      await FAQ.create({
        question: 'Test?', 
        answer: '<p>Test Answer</p>',  
        translations: [],  
      });

      // Sending a GET request to the /api/faqs endpoint
      const res = await chai.request(app).get('/api/faqs');
      
      // Assertions
      expect(res.status).to.equal(200); 
      expect(res.body).to.be.an('array');  
      expect(res.body[0].question).to.equal('Test?');  
    });

    it('should cache FAQs after first request', async () => {
      // Sending a second GET request to check if the FAQs are cached
      await chai.request(app).get('/api/faqs');
      
      // Checking Redis cache for FAQs
      const cached = await client.get('faqs:en');
      
      // Assertion
      expect(cached).to.not.be.null;  
    });
  });

  describe('POST /api/faqs', () => {  
    it('should create an FAQ with translations', async () => {
      // Sending a POST request to create a new FAQ with a question and answer
      const res = await chai.request(app)
        .post('/api/faqs')
        .send({ question: 'Hello', answer: '<p>World</p>' });

      // Assertions
      expect(res.status).to.equal(201);  
      expect(res.body.translations).to.have.lengthOf(2);  
    });
  });
});
