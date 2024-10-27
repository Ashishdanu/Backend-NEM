// test/todo.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Todo = require('../models/Todo');

chai.use(chaiHttp);
const { expect } = chai;

describe('TODO API', () => {
  before(async () => {
    await Todo.deleteMany({});
  });

  it('should create a new TODO', (done) => {
    chai.request(app)
      .post('/api/todos')
      .send({ task: 'Test task' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('task', 'Test task');
        done();
      });
  });

  it('should retrieve TODO items', (done) => {
    chai.request(app)
      .get('/api/todos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update a TODO', async () => {
    const todo = await Todo.create({ task: 'Old Task' });
    const res = await chai.request(app)
      .put(`/api/todos/${todo.id}`)
      .send({ task: 'Updated Task' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('task', 'Updated Task');
  });

  it('should delete a TODO', async () => {
    const todo = await Todo.create({ task: 'To Delete' });
    const res = await chai.request(app).delete(`/api/todos/${todo.id}`);
    expect(res).to.have.status(200);
  });

  it('should batch delete TODOs', async () => {
    const todos = await Todo.create([{ task: 'Task 1' }, { task: 'Task 2' }]);
    const ids = todos.map(todo => todo._id);
    const res = await chai.request(app).delete('/api/todos').send({ ids });
    expect(res).to.have.status(200);
  });
});
