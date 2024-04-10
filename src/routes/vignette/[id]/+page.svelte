<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    /** @type {import('./$types').PageData} */
    export let data;

    import type { UserAnswers } from '../../../types/MCQuestions';
    import { quizQuestions } from '$lib/mcQuestions';
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import MultipleChoice from "$lib/components/MultipleChoice.svelte";
    import NextButton from "$lib/components/NextButton.svelte";
    import BackButton from "$lib/components/BackButton.svelte";

    const quizQuestionsData = quizQuestions.data;
    let userAnswers: UserAnswers = new Array(quizQuestionsData.length).fill(null);
    let currentQuestionIndex = 0;

    quizQuestionsData.forEach((question) => {
		question.attributes.options.sort();
	});

        function handleAnswerSelect(answerIndex: number) {
	    const answer = quizQuestionsData[currentQuestionIndex].attributes.options[answerIndex];
	    userAnswers[currentQuestionIndex] = answerIndex;
	}

	function nextQuestion() {
	    currentQuestionIndex++;
	}
        function prevQuestion() {
            if (currentQuestionIndex != 0) {
                currentQuestionIndex--;
            }
        }

    function handleScroll() {
        let scrollTop = window.scrollY;
        let windowHeight = window.innerHeight;
        let fullHeight = document.body.offsetHeight;

        // Check if the scroll is within a certain range from the bottom
        if (scrollTop + windowHeight >= fullHeight) {
        // User is near the bottom, hide scroll button
        showScrollButton = false;
        } else {
        // User is away from the bottom, show scroll button
        showScrollButton = true;
        }
    }

    // Function to scroll to the bottom of the page
    function scrollToBottom() {
        // Use setTimeout to allow DOM updates before scrolling
        setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        }, 0);
    }
</script>

<body>
    <div class="container mx-auto mt-4 flex flex-wrap justify-center pt-4">
        <div
        class="w-full max-w-sm rounded-lg border border-gray-400 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
        >
        <h1 class="w-full rounded-lg px-5 py-2.5 pb-6 
        text-center text-3xl font-bold dark:text-white text-black"
        >{data.post.title}</h1>
        <p class="w-full rounded-lg px-5 py-2.5 pb-12 
        text-left text-sm font-medium dark:text-white text-black">
            {data.post.content}</p>

        </div>
    </div>
    
    <div class="container mx-auto mt-4 flex flex-wrap justify-center pt-4">
        <div
        class="w-full max-w-sm rounded-lg border border-gray-400 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
        >
        <ProgressBar value={(currentQuestionIndex / quizQuestionsData.length) * 100} />
        {#if currentQuestionIndex < quizQuestionsData.length}
            {#if currentQuestionIndex > 0}
                <BackButton
                    handleClick={() => prevQuestion()}
                    {currentQuestionIndex}
                />
            {/if}
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
