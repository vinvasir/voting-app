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
});