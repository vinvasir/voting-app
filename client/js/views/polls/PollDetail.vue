<template>
	<div>
		<div class="well">
			<h2>{{ poll.title }}</h2>
			<i>By {{ poll.user.username }}</i>
			<p>{{ poll.body }}</p>

			<div v-if="currentUser === poll.user.username">
				<option-form :poll-id="poll.id" :poll-index="index"></option-form>
			</div>
		</div>

		<poll-option v-for="(option, i) in options" :option="option" :index="i" key="option.id" :poll-index="index">
		</poll-option>
	</div>
</template>

<script type="text/javascript">
	import OptionForm from '../options/OptionForm.vue'
	import PollOption from '../options/Option.vue'

	export default {
		components: {
			OptionForm,
			PollOption
		},
		computed: {
			index() {
				return parseInt(this.$route.params.id);
			},
			poll() {
				return this.$store.getters.getPolls[this.index];
			},
			options() {
				return this.$store.getters.getPollDetailOptions;
			},
			currentUser() {
				return this.$store.getters.getCurrentUser;
			}
		},
		created() {
			this.$store.dispatch('fetchPollDetailOptions', this.poll.id);
		}
	}
</script>