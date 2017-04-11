const bookshelf = require('../config/bookshelf-instance');
bookshelf.plugin('registry');

const Poll = require('./poll');

module.exports = bookshelf.model('Option', {
	tableName: 'poll_options',
	poll() {
		return this.belongsTo('Poll');
	}
})