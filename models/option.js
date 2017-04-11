const bookshelf = require('../config/bookshelf-instance');
bookshelf.plugin('registry');

module.exports = bookshelf.model('Option', {
	tableName: 'poll_options',
	poll() {
		return this.belongsTo('Poll');
	}
})