<template>
	<div class="well" @click="vote">
		<h4>{{ option.name }}</h4>
		<h5>{{ option.votes }} votes</h5>		
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			option: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true
			},
			pollIndex: {
				type: Number,
				required: true
			}
		},
		methods: {
			vote() {
				axios
					.post(`/options/${this.option.id}/vote`, {votes: this.option.votes + 1})
					.then(({data}) => {
						// this.$store.dispatch('addVote', {
						// 	option: data, 
						// 	index: this.index, 
						// 	pollIndex: this.pollIndex
						// });
						this.$store.dispatch('fetchPollDetailOptions', this.option.poll_id);
					}).catch(err => {
						this.error = err.response.data;
					});
			}
		}
	}
</script>