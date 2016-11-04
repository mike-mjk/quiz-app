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
		}
	],
	score: 0,
	currentQuestionIndex: 0,
	currentPage: 'start',
}

function renderQuestionPage(state) {
	renderQuestionCount(state);
	renderNumCorrect(state);
	renderAnswers(state);
	renderQuestion(state);
	renderFeedback(state);
	$('.js-submitAnswer').removeClass('hidden');
}

function renderFeedback(state) {
	$('.js-submitAnswer').on("click", function(event) {
		$(".js-form, .js-question, .js-submitAnswer").addClass('hidden');
		var checked = $("input[name='answer']:checked").val();
		$('.js-feedback').removeClass('hidden');
		if(checked == state.questions[state.currentQuestionIndex].correctAnswerIndex){
			alert("that's right");
			$('.js-feedback').text("That's correct!")
		}
		else {
			alert("wrong, bitch");
			var index = (state.questions[state.currentQuestionIndex].correctAnswerIndex);
			var correct = (state.questions[state.currentQuestionIndex].answers[index]);
			$('.js-feedback').text("Sorry, the correct answer is " + correct);

		}
	});
}

function renderQuestionCount(state) {
	$('.js-questionNum').text("Question number " + state.currentQuestionIndex + 1 + " of " + state.questions.length);
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
