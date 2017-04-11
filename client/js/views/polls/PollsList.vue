<template>
	<div>
		<router-link v-for="poll in polls" :poll="poll" :key="poll.id"
			:to="'/polls/' + poll.id">
			<div class="well">
				<h1>{{ poll.title }}</h1>
			</div>		
		</router-link>

		<poll-form></poll-form>
	</div>
</template>

<script type="text/javascript">
	import PollDetail from './PollDetail'
	import PollForm from './PollForm'

	export default {
		components: {
			PollDetail,
			PollForm
		},
		created() {
			this.$store.dispatch('fetchPolls');
		},
		computed: {
			polls() {
				return this.$store.getters.getPolls;
			}
		}
	}
</script>