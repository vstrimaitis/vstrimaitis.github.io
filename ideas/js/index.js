var database;

window.onload = function(){
    initFirebase();

    
    var ref = database.ref('ideas');
    //database.ref('ideas/-KZRPN9DDKSbAQQqS7Jt').set({description: 'test2', title: 'test'});
    
    ref.on('value', function(data){
        clearIdeaItems();
        if(data.val() === null)
            return;
        var ideas = data.val();
        var keys = Object.keys(ideas);
        var items = [];
        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var idea = ideas[k];
            items.push({
                id: k,
                title: idea.title,
                description: idea.description,
                isCompleted: idea.isCompleted
            });
            /*var idea = ideas[keys[i]];
            appendIdeaItem(keys[i], idea.title, idea.description, idea.isCompleted);*/
            
        }
        items.sort(function(a, b){
           if(a.isCompleted == b.isCompleted)
               return 0;
            if(a.isCompleted && !b.isCompleted)
                return 1;
            return -1;
        });
        for(var i = 0; i < items.length; i++)
            appendIdeaItem(items[i]);
    }, function(err){
        alert("An error occurred: "+err);
    });
}

function initFirebase(){
    var config = {
        apiKey: "AIzaSyCR88YzUgEFPXPU76Z1LyYRiyHIYlR46Qk",
        authDomain: "ghpages-ideas.firebaseapp.com",
        databaseURL: "https://ghpages-ideas.firebaseio.com",
        storageBucket: "ghpages-ideas.appspot.com",
        messagingSenderId: "265268201351"
    };
    firebase.initializeApp(config);
    database = firebase.database();
}

function addNewIdea(){
    var titleBox = $('#ideaTitle');
    var descriptionBox = $('#ideaDescription');
    var title = titleBox.val();
    var description = descriptionBox.val();
    titleBox.val('');
    descriptionBox.val('');
    var ref = database.ref('ideas');
    ref.push({title: title, description: description, isCompleted: false});
    //console.log(title, description);
}

function clearIdeaItems(){
    $('#ideasAccordion').html('');
}

function deleteIdea(id){
    if(!confirm('Ar tikrai nori ištrinti įrašą?'))
        return;
    var ref = database.ref('ideas/'+id);
    ref.remove();
}

function completeIdea(id){
    database.ref('ideas/'+id).once('value', function(data){
        var currData = data.val();
        database.ref('ideas/'+id).set({
           title:  currData.title,
            description: currData.description,
            isCompleted: true
        }); 
    });
}

function appendIdeaItem(item){
    item.description = item.description.replace(/(?:\r\n|\r|\n)/g, '<br />');
    var header =    '<h4 class="panel-title">' + 
                        '<a data-toggle="collapse" data-parent="#ideasAccordion" href="#collapse_'+item.id+'">' + 
                            item.title + 
                        '</a>' +
                        '<div class="btn-toolbar pull-right">' + 
                            '<button class="btn btn-xs btn-success" onclick="completeIdea(\''+item.id+'\')"><span class="glyphicon glyphicon-ok"></span></button>' +
                            '<button class="btn btn-xs btn-danger" onclick="deleteIdea(\''+item.id+'\')"><span class="glyphicon glyphicon-trash"></span></button>' + 
                        '</div>' +
                    '</h4>';
    if(item.isCompleted){
        header =     '<h4 class="panel-title"><del>' + 
                        '<a data-toggle="collapse" data-parent="#ideasAccordion" href="#collapse_'+item.id+'">' + 
                            item.title + 
                        '</a>' +
                        '<div class="btn-toolbar pull-right">' + 
                            //'<button class="btn btn-xs btn-warning" onclick="editIdea(\''+id+'\')"><span class="glyphicon glyphicon-pencil"></span></button>' +
                            '<button class="btn btn-xs btn-danger" onclick="deleteIdea(\''+item.id+'\')"><span class="glyphicon glyphicon-trash"></span></button>' + 
                        '</div>' +
                    '</del></h4>';
    }
    var html =  '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                        header + 
                    '</div>' +
                    '<div id="collapse_'+item.id+'" class="panel-collapse collapse">' +
                        '<div class="panel-body">' +
                            item.description+
                        '</div>' +
                    '</div>'+  
                '</div>';
    $('#ideasAccordion').append(html);
}