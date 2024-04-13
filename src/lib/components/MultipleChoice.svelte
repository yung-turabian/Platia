<script lang="ts">
	import Question from './Question.svelte';

	export let quizQuestions: any[];
	export let handleAnswerSelect: (answerIndex: number) => void;
	export let userAnswers: any;
	export let currentQuestionIndex: number;
</script>

<div class="rounded-xl px-4 py-5">
	<p class="text-xs font-light dark:text-white text-black">
		Question {currentQuestionIndex + 1}/{quizQuestions.length}
	</p>
	<Question
		question={quizQuestions[currentQuestionIndex]}
		{handleAnswerSelect}
		userAnswer={userAnswers[currentQuestionIndex]}
	/>
</div>
