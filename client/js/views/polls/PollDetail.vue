<template>
	<div>
		<div class="well">
			<h2>{{ poll.title }}</h2>
			<i>By {{ poll.user.username }}</i>
			<p>{{ poll.body }}</p>

			<div v-if="currentUser === poll.user.username">
				<option-form :poll-id="index"></option-form>
			</div>
		</div>

		<poll-option v-for="option in poll.options" :option="option" key="option.id">
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
				return this.$store.getters.getPolls[this.index - 1];
			},
			currentUser() {
				return this.$store.getters.getCurrentUser;
			}
		}
	}
</script>