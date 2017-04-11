const Poll = require('../../models/poll.js');
const Option = require('../../models/option.js');

describe('Option #create', () => {
	it('should create a new poll option', done => {
		let option = {name: 'Option 1'}

		Option.forge(option).save()
			.then(option => {
				expect(option.attributes.name).to.equal('Option 1');

				Option.fetchAll()
					.then(options => {
						expect(options.length).to.equal(1);

						done();
					})
			}).catch(err => done(err));
	});

	it('should belong to a poll', done => {
		Poll.forge({
				title: 'my cool title',
				body: faker.lorem.paragraph()
			}).save()
			.then(poll => {
				let option = {name: faker.lorem.word(), poll_id: 1};

				Option.forge(option).save()
					.then(option => {
						option.fetch({withRelated: ['poll']})
							.then(optionWithPoll => {
								let pollTitle = optionWithPoll.relations.poll.attributes.title;

								console.log(pollTitle)

								expect(pollTitle).to.equal('my cool title');

								done();
							});
					}).catch(err => done(err));
			})

		

		// promises.push(Option.forge(option).save());
		
		// Promise.all(promises)
		// 	.then(option => {
		// 		console.log(option)
		// 		Option.forge(option).fetch({withRelated: ['post']})
		// 			.then(optionWithPost => {
		// 				expect(optionWithPost.post.attributes.title).to.equal('my cool title');

		// 				done();
		// 			});
		// 	}).catch(err => done(err));
	});
});