// test/blog.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Blog = require('../models/Blog');

chai.use(chaiHttp);
const { expect } = chai;

describe('Blog API', () => {
  before(async () => {
    await Blog.deleteMany({});
  });

  it('should create a new blog post', (done) => {
    chai.request(app)
      .post('/api/blogs')
      .send({ title: 'First Post', content: 'This is the first post', author: 'Author1', tags: ['test'] })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('title', 'First Post');
        done();
      });
  });

  it('should retrieve blog posts with pagination', (done) => {
    chai.request(app)
      .get('/api/blogs?page=1&limit=10')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update a blog post', async () => {
    const post = await Blog.create({ title: 'Old Title', content: 'Content', author: 'Author1' });
    const res = await chai.request(app)
      .put(`/api/blogs/${post.id}`)
      .send({ title: 'Updated Title' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('title', 'Updated Title');
  });

  it('should delete a blog post', async () => {
    const post = await Blog.create({ title: 'To Delete', content: 'Content', author: 'Author2' });
    const res = await chai.request(app).delete(`/api/blogs/${post.id}`);
    expect(res).to.have.status(200);
  });
});
