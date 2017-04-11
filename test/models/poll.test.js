const Poll = require('../../models/poll.js');

describe('Poll #create', () => {
	it('should create a poll', done => {
		let poll = {title: 'first poll', body: 'nothing much'}

		Poll.forge(poll).save()
			.then(poll => {
				expect(poll.attributes.title).to.equal('first poll');

				Poll.fetchAll().then(polls => {
					expect(polls.length).to.equal(1);
					done();
				})
			})
			.catch(e => done(e));
	});

	it('should only allow strings as the title', done => {
		let badPoll = {title: 35, body: faker.lorem.paragraph()}

		Poll.forge(badPoll).save().then(() => {
			done()
		}).catch(() => done());

		Poll.forge(badPoll).fetch()
			.then(poll => {
				expect(poll).to.equal(null);
			})
	})

	it('should only allow text as the body', done => {
		let badPoll = {title: 'cool title', body: 463.1}

		Poll.forge(badPoll).save().then(() => {
			done()
		}).catch(() => done());

		Poll.forge(badPoll).fetch()
			.then(poll => {
				expect(poll).to.equal(null);
			})
	})
});

describe('Poll #all', () => {
	beforeEach(done => {
		var promises = [];

		for(let i=0, l=5; i < l; i++) {
			promises.push(
				Poll.forge({
					title: faker.lorem.word(),
					body: faker.lorem.paragraph()
				}).save()
			);
		}

	  Promise.all(promises).then(values => {
			 done();
		}).catch(err => done(err));
	});

	it('should return all polls', done => {
		Poll.fetchAll()
			.then(polls => {
				expect(polls.length).to.equal(5);
				done();
			});
	});
});