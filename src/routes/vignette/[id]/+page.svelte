<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    /** @type {import('./$types').PageData} */
    export let data;

    import type { UserAnswers } from '../../../types/MCQuestions';
    import { quizQuestions } from '$lib/mcQuestions';
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import MultipleChoice from "$lib/components/MultipleChoice.svelte";
    import NextButton from "$lib/components/NextButton.svelte";



    const quizQuestionsData = quizQuestions.data;
    let userAnswers: UserAnswers = new Array(quizQuestionsData.length).fill(null);
    let currentQuestionIndex = 0;

    quizQuestionsData.forEach((question) => {
		question.attributes.options.sort();
	});

    function handleAnswerSelect(answerIndex: number) {
		if (userAnswers[currentQuestionIndex] !== null) {
			return;
		}

		const answer = quizQuestionsData[currentQuestionIndex].attributes.options[answerIndex];

		userAnswers[currentQuestionIndex] = answerIndex;
	}

	function nextQuestion() {
		currentQuestionIndex++;
	}

</script>

<body>
    <div class="container mx-auto mt-4 flex flex-wrap justify-center pt-4">
        <div
        class="w-full max-w-sm rounded-lg border border-gray-400 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
        >
        <h1 class="w-full rounded-lg px-5 py-2.5 
        text-center text-3xl font-bold dark:text-white text-black"
        >{data.post.title}</h1>
        <p class="w-full rounded-lg px-5 py-2.5 
        text-left text-sm font-medium dark:text-white text-black">
            {data.post.content}</p>

        <a href="/vignette/egmpdb5wxn0i5ds">
            <button
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5
            text-center text-sm font-medium text-white hover:bg-blue-800 
            focus:ring-4 focus:ring-blue-300 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Continue</button>
        </a>
        </div>
    </div>

    <div class="container mx-auto mt-4 flex flex-wrap justify-center pt-4">
        <div
        class="w-full max-w-sm rounded-lg border border-gray-400 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
        >
        <ProgressBar value={(currentQuestionIndex / quizQuestionsData.length) * 100} />
        {#if currentQuestionIndex < quizQuestionsData.length}
            <MultipleChoice
                quizQuestions={quizQuestionsData}
                {currentQuestionIndex}
                {handleAnswerSelect}
                {userAnswers}
            />
            <NextButton
                handleClick={() => nextQuestion()}
                {currentQuestionIndex}
                totalAmountQuestions={quizQuestionsData.length}
            />
       {/if}
        </div>
    </div>
</body>
