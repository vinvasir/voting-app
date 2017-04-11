const bookshelf = require('../config/bookshelf-instance');
bookshelf.plugin('registry');
const User = require('./user');

module.exports = bookshelf.model('Poll', {
	tableName: 'polls',
	user() {
		return this.belongsTo('User');
	},
	options() {
		return this.hasMany('Option');
	}
});