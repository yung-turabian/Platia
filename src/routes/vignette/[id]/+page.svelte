<script lang="ts">
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import MultipleChoice from "$lib/components/MultipleChoice.svelte";
    import NextButton from "$lib/components/NextButton.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import { fade } from "svelte/transition";
    import Alert from "flowbite-svelte/Alert.svelte";
    import type { PageData } from "./$types";
    import { currentUser, pb } from "$lib/pocketbase";

    export let data : PageData;

    const VIGNETTES: string[] = ['egmpdb5wxn0i5ds', 'ss9l9lk2pk3yvms', 'ciqudfor6db763i', 'ntwlfyr56i4tvvx', '7ojcaft5uqmvqxa'];
    let currentVignetteIndex = 0;

    let visible = false;
    let done = false;
    let error: string;

    let quizQuestionsData: any = [];
    let userAnswers: number[] = [];
    let currentQuestionIndex = 0;

    let userAnswersData: { [key: string]: { 
        questions: string[]; 
        numeric: number[]; 
        string: string[] 
    } } = {};
    
    VIGNETTES.forEach((vignetteId) => {
        userAnswersData[vignetteId] = {
            questions: new Array(quizQuestionsData.length).fill(null),
            numeric: new Array(quizQuestionsData.length).fill(null),
            string: new Array(quizQuestionsData.length).fill(null)
        };
        quizQuestionsData.forEach((question: { attributes: { question: string } }) => {
            userAnswersData[vignetteId].questions.push(question.attributes.question);
        });
    });

    function saveUserAnswersToJSON() {
        const currentVignetteId = VIGNETTES[currentVignetteIndex];
        userAnswersData[currentVignetteId].numeric = userAnswers.slice(); // Clone the numeric array
        
        const questions: string[] = [];
        const answers: string[] = [];

        userAnswers.forEach((answerIndex, index) => {
            if (answerIndex !== null && answerIndex !== undefined) {
                const question = quizQuestionsData[index].attributes.question;
                questions.push(question);
                
                const answer = quizQuestionsData[index].attributes.options[answerIndex];
                answers.push(answer);
            }
        });

        userAnswersData[currentVignetteId].string = answers;
        userAnswersData[currentVignetteId].questions = questions;

    }

    async function storeUserAnswersToDatabase() {
        try {
            const serializedData = JSON.stringify(userAnswersData);
            const data = {
                "answers": serializedData
            };

            const record = await pb.collection('users').update($currentUser.id, data);
        } catch (error) {
            console.error("Error storing user answers:", error);
        }
    }

    $: quizQuestionsData = data.post.questions.data;
    $: userAnswers = new Array(quizQuestionsData.length).fill(null);
    

    quizQuestionsData.forEach((question: { attributes: { options: any[]; }; }) => {
        question.attributes.options.sort();
    });

    function handleAnswerSelect(answerIndex: number) {
	    userAnswers[currentQuestionIndex] = answerIndex;
	}

	function nextQuestion() {
        try {
            if (userAnswers[currentQuestionIndex] != null) {
                currentQuestionIndex++;
                if (currentQuestionIndex == quizQuestionsData.length) {
                    done = true;
                }
            } else {
                throw new TypeError();
            }
        } catch (err) {
            console.error(err);
            error = "Select a reponse before moving on please.";
            scrollToBottom();
        }
	}
    function prevQuestion() {
        if (currentQuestionIndex != 0) {
            currentQuestionIndex--;
        }
    }

    function toggleVissible() {
        if (visible == false) {
            visible = !visible;
            scrollToBottom();
        } else {
            scrollToBottom();
            console.log(userAnswers);
            return;
        }
    }

    function reset() {
        saveUserAnswersToJSON();
        storeUserAnswersToDatabase();
        visible = false;
        done = false;
        currentQuestionIndex = 0;
        currentVignetteIndex++;
    }

    function scrollToBottom() {
        setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        }, 0);
    }
</script>

<body>
    {#if $currentUser}
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
                <button
                on:click={toggleVissible}
                    class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Continue</button
                >
            </div>
        </div>

        {#if visible}
            <div class="container mx-auto mt-4 flex flex-wrap justify-center pt-4"
                    transition:fade={{ delay: 250, duration: 300 }}>
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
                    {#if error}
                            <div class="mt-6">
                                <Alert alertId="alert-red" color="red" closeBtn>
                                    {error}
                                </Alert>
                            </div>
                        {/if}
                    {/if}

                    {#if done}
                        {#if currentVignetteIndex < VIGNETTES.length}
                            <a href="/vignette/{VIGNETTES[currentVignetteIndex+1]}">
                                <button
                                on:click={reset}
                                class="w-full rounded-lg bg-blue-700 px-5 py-2.5
                                text-center text-sm font-medium text-white hover:bg-blue-800 
                                focus:ring-4 focus:ring-blue-300 
                                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Next</button>
                            </a>
                            {:else}
                            <a href="/room/{$currentUser.id}">
                                <button
                                on:click={reset}
                                class="w-full rounded-lg bg-blue-700 px-5 py-2.5
                                text-center text-sm font-medium text-white hover:bg-blue-800 
                                focus:ring-4 focus:ring-blue-300 
                                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Next</button>
                            </a>
                        {/if}
                    {/if}
                </div>
            </div>
        {/if}
    {:else}
        <a href="/">
            <button
            on:click={reset}
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5
            text-center text-sm font-medium text-white hover:bg-blue-800 
            focus:ring-4 focus:ring-blue-300 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Please Login</button>
        </a>
    {/if}
</body>
