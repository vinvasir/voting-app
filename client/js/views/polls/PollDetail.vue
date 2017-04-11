<template>
	<div class="well">
		<h2>{{ poll.title }}</h2>
		<p>{{ poll.body }}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		computed: {
			index() {
				return parseInt(this.$route.params.id);
			},
			poll() {
				return this.$store.getters.getPolls[this.index - 1];
			}
		}
	}
</script>