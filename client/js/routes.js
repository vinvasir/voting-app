import VueRouter from 'vue-router';

let routes = [
	{
		path: '/',
		component: require('./views/Welcome.vue')
	},
	{
		path: '/help',
		component: require('./views/Help.vue')
	},
	{
		path: '/login',
		component: require('./views/Login.vue')
	},
	{
		path: '/register',
		component: require('./views/Register.vue')
	},
	{
		path: '/polls',
		component: require('./views/polls/PollsList.vue')
	},
	{
		path: '/polls/:id',
		component: require('./views/polls/PollDetail.vue')
	}
];

export default new VueRouter({
	routes,
	linkActiveClass: 'is-active'
})