var database;
var allQuestions = [];
var currentQuestions = [];

$(document).ready(function(){
    initFirebase();
    allowTabsFor('textarea');
    enableTestPreview();
    enableOpenPreview();

    var ref = database.ref('questions');
    ref.once('value', function(data){
        allQuestions = [];
        var q = data.val();
        var keys = Object.keys(q);
        for(var i = 0; i < keys.length; i++){
            allQuestions.push(q[keys[i]]);
        }
        currentQuestions = allQuestions.slice(0);
        updateQuestionCountBadge();
        displayRandomQuestion();
    });


    var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        next = next + 1;
        var removeBtn = '<button tabindex="-1" id="remove_' + (next) + '" class="btn btn-danger remove-button" >'+
                            '<span class="glyphicon glyphicon-trash"></span>'+
                        '</button>';
        var newIn = '<div class="input-group" id="answer_'+next+'">'+
                        '<span class="input-group-addon">'+
                            '<input type="checkbox" tabindex="-1" class="testAnswerCb" id="answerCb_'+next+'">'+
                        '</span>'+
                        '<input type="text" class="input form-control testAnswerText" autocomplete="off" id="answerText_'+next+'" name="answerText_'+next+'">'+
                        '<span class="input-group-btn">'+
                            removeBtn+
                        '</span>'+
                    '</div>';
        $('#answerItems').append(newIn);
        $('.remove-button').click(function(e){
            e.preventDefault();
            var id = this.id.split('_')[1];
            var fieldId = '#answer_' + id;
            var previewFieldId = '#testAnswerPreview_' + id;
            $(this).remove();
            $(fieldId).remove();
            $(previewFieldId).remove();
        });

        // Append new item to preview
        var previewItem =   '<div class="checkbox disabled" id="testAnswerPreview_'+next+'">' +
                                '<label><input type="checkbox" id="testAnswerPreviewCb_'+next+'" disabled><span id="testAnswerPreviewText_'+next+'"></span></label>' +
                            '</div>';
        $('#testAnswersPreview').append(previewItem);
    });

    $('#addTestQuestionButton').click(function(e){
        e.preventDefault();
        var questionData = {};
        questionData.type = 'test';
        questionData.question = $('#testQuestion').val();
        questionData.explanation = $('#testExplanation').val();
        questionData.answers = [];
        //questionData.correctAnswers = [];
        var answerGroups = $('#answerItems')[0].children;
        for(var i = 0; i < answerGroups.length; i++){
            var innards = $(answerGroups[i])[0].children;
            var isChecked = $($(innards[0])[0].children[0]).prop('checked');
            var answerText = $(innards[1]).val();
            questionData.answers.push({text: answerText, isCorrect: isChecked});
        }
        
        ref.push(questionData);
        allQuestions.push(questionData);
        currentQuestions.push(questionData);
        updateQuestionCountBadge();
    });

    $('#addOpenQuestionButton').click(function(e){
        e.preventDefault();
        var questionData = {};
        questionData.type = 'open';
        questionData.question = $('#openQuestion').val();
        questionData.answer = $('#openAnswer').val();
        questionData.explanation = $('#openExplanation').val();

        ref.push(questionData);
        allQuestions.push(questionData);
        currentQuestions.push(questionData);
        updateQuestionCountBadge();
    });

    $('#nextQuestionButton').click(function(e){
        e.preventDefault();
        displayRandomQuestion();
    });


    $(document).on('click', '#showAnswersButton', function(e){
        $('.hiddenAnswer').removeClass('hiddenAnswer');
        $('.correctChoice').addClass('text-success');
        $('.correctChoice').append('<span class="glyphicon glyphicon-ok-circle"></span>');
        $('.wrongChoice').addClass('text-danger');
        $('.wrongChoice').append('<span class="glyphicon glyphicon-remove-circle"></span>');
        //$(this).remove();
    });

});

function updateQuestionCountBadge(){
    $('#questionCount').html(allQuestions.length);
}

function allowTabsFor(selector){
    $(document).delegate(selector, 'keydown', function(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                        + "    "
                        + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart =
            $(this).get(0).selectionEnd = start + 4;
        }
    });
}

function enableTestPreview(){
    $('#testQuestion').on('input', function(){
        $('#testQuestionPreview').html($(this).val());
    });

    $('#testExplanation').on('input', function(){
        $('#testExplanationPreview').html($(this).val());
    });

    $(document).on('change', '.testAnswerCb', function(){
        var id = $(this).attr('id').split('_')[1];
        $('#testAnswerPreviewCb_'+id).prop('checked', $(this).prop('checked'));
    });

    $(document).on('input', '.testAnswerText', function(){
        var id = $(this).attr('id').split('_')[1];
        $('#testAnswerPreviewText_'+id).html($(this).val());
    });
}

function enableOpenPreview(){
    $('#openQuestion').on('input', function(){
        $('#openQuestionPreview').html($(this).val());
    });

    $('#openExplanation').on('input', function(){
        $('#openExplanationPreview').html($(this).val());
    });

    $('#openAnswer').on('input', function(){
        $('#openAnswerPreview').html($(this).val());
    });
}

function displayRandomQuestion(){
    var question = getRandomQuestion();
    if(question.type === 'test'){
        displayTestQuestion(question);
    } else {
        displayOpenQuestion(question);
    }
}

function displayOpenQuestion(q){
    var html =  '<h3 class="question">'+q.question+'</h3>'+
                '<textarea class="form-control answerInput" placeholder="Vieta atsakymui"></textarea>'+
                '<div class="hiddenAnswer">'+
                    '<h3>Atsakymas:</h3>' +
                    '<blockquote class="blockquote"><p class="mb-0">'+q.answer+'</p></blockquote>' + 
                    '<h3>Paaiškinimas:</h3>'+
                    '<blockquote class="blockquote"><p class="mb-0">'+q.explanation+'</p></blockquote>' +
                '</div>';
    $('#questionContent').html(html);

}

function displayTestQuestion(q){
    var html =  '<h3 class="question">'+q.question+'</h3>';
    for(var i = 0; i < q.answers.length; i++){
        var a = q.answers[i];
        var correctChoice = a.isCorrect ? 'correctChoice' : 'wrongChoice';
        html += '<div class="checkbox '+correctChoice+'">'+
                    '<label><input type="checkbox">'+a.text+'</label>'+
                '</div>';
    }
    html += '<div class="hiddenAnswer">'+ 
                '<h3>Paaiškinimas:</h3>'+
                '<blockquote class="blockquote"><p class="mb-0">'+q.explanation+'</p></blockquote>' +
            '</div>';
    $('#questionContent').html(html);
}

function getRandomQuestion(){
    if(currentQuestions.length === 0){
        currentQuestions = allQuestions.slice(0);
    }
    var i = Math.floor(Math.random() * currentQuestions.length);
    var toReturn = currentQuestions[i];
    currentQuestions.splice(i, 1);
    return toReturn;
}

function initFirebase(){
    var config = {
        apiKey: "AIzaSyA-V5YX1XM90JgTcUAqATfi99tvVWnnXec",
        authDomain: "topexamquiz.firebaseapp.com",
        databaseURL: "https://topexamquiz.firebaseio.com",
        storageBucket: "topexamquiz.appspot.com",
        messagingSenderId: "630569747383"
    };
    firebase.initializeApp(config);
    database = firebase.database();
}
