const express = require('express');
const localAuth = require('../middleware/local-authenticate');

const router = express.Router();
router.use(express.static('public'));
router.use(require('connect-flash')());

const Poll = require('../models/poll');

router.get('/', (req, res) => {
	Poll.fetchAll({withRelated: ['user', 'options']})
		.then(polls => {
			res.status(200).json({polls})
		}).catch(e => console.error(e));
});

router.post('/', localAuth, (req, res) => {
	const {title, body} = req.body;

	let id;

	if(res.locals.user) {
		id = res.locals.user.attributes.id;
	} else {
		id = null;
	}

	console.log("In the post action, the id is : " + id);

	Poll.forge({title, body, user_id: id}).save()
		.then(poll => {
			res.status(200).json({data: poll})
		}).catch(e => {
			res.json({msg: req.flash('error')})
		});
});

router.get('/:id', (req, res) => {
	Poll.forge({id: req.params.id}).fetch({withRelated: ['user']})
		.then(poll => res.status(200).json({
			poll: poll.omit('user'), 
			user: poll.relations.user.omit('password')
		}))
		.catch(e => console.error(e));
})

module.exports = router;