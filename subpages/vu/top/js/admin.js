var database;
var questions = [];

$(document).ready(function(){
    initFirebase();

    var ref = database.ref('questions');
    ref.once('value', function(data){
        questions = [];
        var q = data.val();
        var keys = Object.keys(q);
        for(var i = 0; i < keys.length; i++){
            questions.push(q[keys[i]]);
        }
    });


    var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        next = next + 1;
        var removeBtn = '<button id="remove_' + (next) + '" class="btn btn-danger remove-button" >'+
                            '<span class="glyphicon glyphicon-trash"></span>'+
                        '</button>';
        var newIn = '<div class="input-group" id="answer_'+next+'">'+
                        '<span class="input-group-addon">'+
                            '<input type="checkbox" id="answer_cb_'+next+'">'+
                        '</span>'+
                        '<input type="text" class="input form-control" autocomplete="off" id="answer_text_'+next+'" name="answer_text_'+next+'">'+
                        '<span class="input-group-btn">'+
                            removeBtn+
                        '</span>'+
                    '</div>';
        $('#answerItems').append(newIn);
        $('.remove-button').click(function(e){
            e.preventDefault();
            var fieldId = '#answer_' + this.id.split('_')[1];
            $(this).remove();
            $(fieldId).remove();
        });
    });

    $('#addTestQuestionButton').click(function(e){
        e.preventDefault();
        var questionData = {};
        questionData.type = 'test';
        questionData.question = $('#testQuestion').val();
        questionData.answers = [];
        questionData.correctAnswers = [];
        var answerGroups = $('#answerItems')[0].children;
        for(var i = 0; i < answerGroups.length; i++){
            var innards = $(answerGroups[i])[0].children;
            var isChecked = $($(innards[0])[0].children[0]).prop('checked');
            var answerText = $(innards[1]).val();
            questionData.answers.push(answerText);
            if(isChecked){
                questionData.correctAnswers.push(i);
            }
        }

        ref.push(questionData);
        questions.push(questionData);
    });

    $('#addOpenQuestionButton').click(function(e){
        e.preventDefault();
        var questionData = {};
        questionData.type = 'open';
        questionData.question = $('#openQuestion').val();
        questionData.answer = $('#openAnswer').val();

        ref.push(questionData);
        questions.push(questionData);
    });

    $('#nextQuestionButton').click(function(e){
        e.preventDefault();
        var question = getRandomQuestion();
        if(question.type === 'test'){
            displayTestQuestion(question);
        } else {
            displayOpenQuestion(question);
        }
    });

});

function displayOpenQuestion(q){
    var html =  '<h3 class="question">'+q.question+'</h3>'+
                    '<textarea class="form-control answerInput" placeholder="Vieta atsakymui"></textarea>'+
                '<button type="button" class="btn btn-success" id="showAnswer">Parodyti teisingą atsakymą</button>';
    $('#questionContent').html(html);

}

function displayTestQuestion(q){

}

function getRandomQuestion(){
    return questions[Math.floor(Math.random() * questions.length)];
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
