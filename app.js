var state = {
	questions: [
		{
			text: "Who said, \"The only thing we have to fear is fear itself.\"?",
			answers: ["Franklin D Roosevelt", "Abraham Lincoln", "Donald Trump", "John F Kennedy"],
			correctAnswerIndex: 0
		},
		{
			text: "Who said, \"And so, my fellow Americans, ask not what your country can do for you --\
			 ask what you can do for your country.\"?",
			answers: ["Franklin D Roosevelt", "John F Kennedy", "Abraham Lincoln", "Mahatma Gandhi"],
			correctAnswerIndex: 1
		},
		{
			text: "Who said, \"Yesterday, December 7, 1941 -- a date which will live in infamy -- the United States\
			of America was suddenly and deliberately attacked by naval and air forces of the Empire of Japan.",
			answers: ["Franklin D Roosevelt", "John F Kennedy", "Abraham Lincoln", "Mahatma Gandhi"],
			correctAnswerIndex: 0
		},
		{
			text: "No puppet! No Puppet! You're the puppet! No, you're the puppet!",
			answers: ["Abraham Lincoln", "John F Kennedy", "Donald Trump", "Hillary Clinton"],
			correctAnswerIndex: 2
		},
		{
			text: "Let's dispel with this fiction that Barack Obama doesn't know\
			 what he's doing. He knows exactly what he's doing.",
			answers: ["Donald Trump", "Hillary Clinton", "Barack Obama", "Marco Rubio"],
			correctAnswerIndex: 3
		}

	],
	score: 0,
	currentQuestionIndex: 0,
}

function renderQuestionPage(state) {
	$(".js-form, .js-question, .js-submitAnswer, .js-questionNum").removeClass('hidden');
	$(".js-feedback, .js-nextQuestion").addClass('hidden');
	renderQuestionCount(state);
	renderNumCorrect(state);
	renderAnswers(state);
	renderQuestion(state);
	renderFeedback(state);
	$('.js-submitAnswer').removeClass('hidden');
}

function clickNextQuestion(state) {
	$('.js-nextQuestion').off("click").on("click", function(event) {
		renderQuestionPage(state);
	})
}

function renderFeedback(state) {
	$('.js-submitAnswer').off("click").on("click", function(event) {
		$(".js-form, .js-question, .js-submitAnswer, .js-questionNum").addClass('hidden');
		var checked = $("input[name='answer']:checked").val();
		$('.js-feedback').removeClass('hidden');
		
		if (state.currentQuestionIndex !== state.questions.length - 1) {
			$('.js-nextQuestion').removeClass('hidden');
			clickNextQuestion(state);
		}

		if (state.currentQuestionIndex === state.questions.length - 1) {
			$('.js-restart').removeClass('hidden');
			$('.js-restart').on("click", function(event) {
				state.currentQuestionIndex = 0;
				state.score = 0;
				$(this).addClass('hidden');
				$('.js-form').removeClass('hidden');
				$('.js-question').removeClass('hidden');
				$('.js-questionNum').removeClass('hidden');
				$('.js-numCorrect').removeClass('hidden');


	renderQuestionPage(state);

			});
		}


		if(checked == state.questions[state.currentQuestionIndex].correctAnswerIndex){
			$('.js-feedback').text("That's correct!")
			state.score = state.score + 1;
			state.currentQuestionIndex += 1
			renderNumCorrect(state);
		}
		else {
			var index = (state.questions[state.currentQuestionIndex].correctAnswerIndex);
			var correct = (state.questions[state.currentQuestionIndex].answers[index]);
			$('.js-feedback').text("Sorry, the correct answer is " + correct);
			state.currentQuestionIndex += 1;
			renderNumCorrect(state);
		}

	});
}

function renderQuestionCount(state) {
	$('.js-questionNum').removeClass('hidden');
	$('.js-questionNum').text("Question number " + (state.currentQuestionIndex + 1) + " of " + state.questions.length);
}

function renderNumCorrect(state) {
	$('.js-numCorrect').text(state.score + " of " + state.currentQuestionIndex + " correct");
}

function renderAnswers(state) {
	var answerArray = state.questions[state.currentQuestionIndex].answers.map(function(item, index) {
		return (
			"<input type='radio' name='answer' id='answer" + index + "' value='" + index + "'> \
			<label for='answer" + index + "'>" + item + "</label>"
		)
	})
	$('.js-form').html(answerArray);
}

function renderQuestion(state) {
	qtext = state.questions[state.currentQuestionIndex].text;
	$('.js-question').text(qtext);
}

function renderStartPage(state) {
	$('js-start').click(function(event) {
		event.preventDefault();
		state.currentPage = 'question';

	})
}

$('.js-start').click(function(event) {
	event.preventDefault();
	$(this).addClass('hidden');
	$('.js-form').removeClass('hidden');
	$('.js-question').removeClass('hidden');
	$('.js-questionNum').removeClass('hidden');
	$('.js-numCorrect').removeClass('hidden');


	renderQuestionPage(state);
})
