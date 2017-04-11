import Vue from 'vue'
import Vuex from 'vuex'

const state = {
	token: null,
	currentUser: null,
	polls: null,
	pollDetailOptions: null
};

const getters = {
  isAuthenticated: state => {
    return state.token != null
  },
  getCurrentUser: state => {
  	return state.currentUser;
  },
  getPolls: state => {
  	return state.polls;
  },
  getPollDetailOptions: state => {
  	return state.pollDetailOptions;
  }
};

const mutations = {
  'SET_TOKEN'(state, payload) {
    state.token = payload
    localStorage.setItem("token", payload)
  },
  'CLEAR_TOKEN'(state) {
    state.token = null
    localStorage.removeItem("token")
  },
  'SET_CURRENT_USER'(state, payload) {
  	state.currentUser = payload;
  },
  'SET_POLLS'(state, payload) {
  	state.polls = payload;
  },
  'SET_OPTIONS'(state, payload) {
  	state.pollDetailOptions = payload;
  },
  'ADD_POLL'(state, payload) {
  	state.polls.push(payload);
  },
  'ADD_OPTION'(state, payload) {
  	state.polls[payload.poll_id - 1].options.push(payload)
  }
}

const actions = {
	setToken({commit}, token) {
		commit('SET_TOKEN', token);
	},
	clearToken({commit}) {
		commit('CLEAR_TOKEN', token);
	},
	setCurrentUser({commit}) {
		let user = null;

		axios.get('/current_user')
			.then(({data}) => {
				console.log(data.user);
				user = data.user;
				commit('SET_CURRENT_USER', user);
			}).catch(err => user = null);
	},
	fetchPolls({commit}) {
		let polls = null;

		axios.get('/polls')
			.then(({data}) => {
				polls = data.polls;
				commit('SET_POLLS', polls);
			}).catch(err => polls = null);
	},
	fetchPollDetailOptions({commit}, id) {
		let options = null;

		axios.get(`/polls/${id}`)
			.then(({data}) => {
				options = data.options;
				commit('SET_OPTIONS', options);
			}).catch(err => options = null);
	},
	addPoll({commit}, payload) {
		commit('ADD_POLL', payload.data);
	},
	addOption({commit}, payload) {
		commit('ADD_OPTION', payload.data);
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});