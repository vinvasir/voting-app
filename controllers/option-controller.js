const express = require('express');
const localAuth = require('../middleware/local-authenticate');

const router = express.Router();
router.use(require('connect-flash')());

const Option = require('../models/option');

router.post('/:id/vote', (req, res) => {
	console.log("the request body is: " + req.body.votes);
	Option.forge({id: req.params.id})
		.save({votes: req.body.votes}, {patch: true})
		.then(option => {
			console.log('the new option is ' + option);
			option.fetch().then(fullOption => res.status(200).json({data: option}))
			// res.status(200).json({data: option});
		}).catch(e => res.json({msg: req.flash('error')}));
});

module.exports = router;