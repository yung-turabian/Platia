<script lang="ts">
	export let handleClick: () => void;
	export let currentQuestionIndex: number;
</script>

<div class="flex justify-center mb-4">
	<button
		class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={handleClick}
	>
		{currentQuestionIndex + 1 !== 1 ? 'Back' : ''}
	</button>
</div>
