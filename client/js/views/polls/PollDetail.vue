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

		<div class="well" v-for="option in poll.options">
			<h4>{{ option.name }}</h4>
		</div>
	</div>
</template>

<script type="text/javascript">
	import OptionForm from '../options/OptionForm.vue'

	export default {
		components: {
			OptionForm
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