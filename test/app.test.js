const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('appointment app', () => {
    it('should return the list of all users', () => {
        supertest(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) throw err;

            const expectedResult = [
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 42,
                    id: "1"
                }
            ];

            expect(res.body.users).to.be.deep.equal(expectedResult);
        })
    });

    it('should create a new user and return the recently created user with a new id', () => {
        supertest(app)
        .post('/api/users')
        .send({
            firstName: 'Julian',
            lastName: 'Soto',
            age: 20
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
            if (err) throw err;

            expect(res.body.user).to.be.ok;
            expect(res.body.user.id).to.be.ok;
            expect(res.body.user.firstName).to.be.equal('Julian');
            expect(res.body.user.lastName).to.be.equal('Soto')
            expect(res.body.user.age).to.be.equal(20);
        })
    });

    it('should create a new user without first name and return an error', () => {
        supertest(app)
        .post('/api/users')
        .send({
            lastName: 'blah blah',
            age: 18
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it('should create a new user with an empty first name and return an error', () => {
        supertest(app)
        .post('/api/users')
        .send({
            firstName: '',
            lastName: 'blah',
            age: 18
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it('should create a new user without last name and return an error', () => {
        supertest(app)
        .post('/api/users')
        .send({
            firstName: 'blah blah',
            age: 18
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it('should create a new user with an empty last name and return an error', () => {
        supertest(app)
        .post('/api/users')
        .send({
            firstName: 'blah',
            lastName: '',
            age: 18
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it('should create a new user without age and return an error', () => {
        supertest(app)
        .post('/api/users')
        .send({
            firstName: 'blah blah',
            lastName: 'blah blah'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it('should create a new user with an age less than 0 and return an error', () => {
        supertest(app)
        .post('/api/users')
        .send({
            firstName: 'blah blah',
            lastName: 'blah blah',
            age: -1
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it('should GET one single user', () => {
        supertest(app)
        .get('/api/users/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.user.id).to.be.ok;
            expect(res.body.user.firstName).to.be.equal('John');
            expect(res.body.user.lastName).to.be.equal('Doe');
            expect(res.body.user.age).to.be.equal(42);
        })
    });

    it('should return an error if user does not exist', () => {
        supertest(app)
        .get('/api/users/0')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it ('should update user first name and last name and return the updated user', () => {
        supertest(app)
        .put('/api/users/1')
        .send({
            firstName: 'Randy',
            lastName: 'Orton'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.user.firstName).to.be.equal('Randy');
            expect(res.body.user.lastName).to.be.equal('Orton');
        })
    });

    it('should try to update a non existing user and return an error', () => {
        supertest(app)
        .put('/api/users/0')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({});
        })
    });

    it('should delete an existing user', () => {
        supertest(app)
        .delete('/api/users/1')
        .expect(204)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({})
        })
    });

    it('should try to delete a non existing user and return an error', () => {
        supertest(app)
        .delete('/api/users/0')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body).to.be.deep.equal({})
        })
    });

    it('should get a list of all users', () => {
        supertest(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) throw err;

            expect(res.body.users[0].id).to.be.ok;
            expect(res.body.users[0].firstName).to.be.equal('Julian');
            expect(res.body.users[0].lastName).to.be.equal('Soto');
            expect(res.body.users[0].age).to.be.equal(20);
        });
    });
});
