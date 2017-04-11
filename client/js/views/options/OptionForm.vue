<template>
	<form @submit.prevent="handleSubmit">
		<div class="alert alert-danger" v-if="error" v-for="(value, key) in error">
			{{ key }} : {{ value }}
		</div>

		<h3>Add an Option To Your Poll:</h3>

		<div class="form-group">
			<label for="name">Option Name:</label>
			<input id="name" v-model="newOption.name" class="form-control">
		</div>

		<button type="submit" class="btn btn-default">Add Option</button>
	</form>
</template>

<script type="text/javascript">
	export default {
		props: {
			pollId: {
				type: Number,
				required: true
			},
			pollIndex: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				newOption: {},
				error: null
			}
		},
		methods: {
			handleSubmit() {
				axios.post(`/polls/${this.pollId}/options`, this.newOption)
					.then(({data}) => {
						this.$store.dispatch('addOption', {option: data, pollIndex: this.pollIndex})
					}).catch(err => {
						this.error = err.response.data;
					});
			}
		}
	}
</script>