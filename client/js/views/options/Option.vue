<template>
	<div class="well" @click="addVote">
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
			}
		},
		methods: {
			addVote() {
				axios.post(`/options/${this.option.id}/vote`)
					.then(({data}) => {
						this.$store.dispatch('addVote', data)
					}).catch(err => {
						this.error = err.response.data;
					});
			}
		}
	}
</script>