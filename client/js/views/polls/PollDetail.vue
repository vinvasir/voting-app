<template>
	<div class="well">
		<h2>{{ poll.title }}</h2>
		<p>{{ poll.body }}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			poll: {
				type: Object,
				required: true
			}
		}
	}
</script>