<script lang="ts">
	import CheckmarkIcon from './CheckmarkIcon.svelte';

	export let question: any;
	export let handleAnswerSelect: (answerIndex: number) => void;
	export let userAnswer: any;

	$: userAnswer, console.log(userAnswer);
</script>

<h1 class="text-xl pb-2 font-bold dark:text-white text-black">{question.attributes.question}</h1>
<div class="flex flex-col gap-2">
	{#each question.attributes.options as answer, index}
		<button
			class="
            p-4 flex text-left items-center row gap-4 rounded-xl border dark:text-white text-black {userAnswer === index
				? 'border-blue-800 bg-white shadow-md dark:border-gray-100 dark:bg-gray-800'
				: 'border-gray-400 dark:border-gray-700'}"
			on:click={() => handleAnswerSelect(index)}
		>
			{#if userAnswer === index}
				<CheckmarkIcon />
			{/if}
			{answer}
		</button>
	{/each}
</div>
