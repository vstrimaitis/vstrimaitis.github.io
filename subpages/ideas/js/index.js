var database;
var editingEnabled = false;
window.onload = function(){
    init();
    fetchIdeas();
}

function fetchIdeas() {
    var ref = database.ref('ideas');
    //database.ref('ideas/-KZRPN9DDKSbAQQqS7Jt').set({description: 'test2', title: 'test'});
    
    ref.on('value', function(data){
        $('.loader').hide();
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

function init() {
    disableEditing();
    firebase.auth().onAuthStateChanged(function(u) {
        user = u;
        if (u) {
            console.log("Logged in. UID: " + u.uid);
            enableEditing();
        } else {
            console.log("Not logged in");
            disableEditing();
        }
    });

    database = firebase.database();
}

function login() {
    firebase.auth().signOut();

    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function enableEditing() {
    editingEnabled = true;
    $(".edit-action").removeAttr("disabled");
}

function disableEditing() {
    editingEnabled = false;
    $(".edit-action").attr("disabled", "disabled");
}

function addNewIdea(){
    var titleBox = $('#ideaTitle');
    var descriptionBox = $('#ideaDescription');
    var title = titleBox.val();
    var description = descriptionBox.val();
    titleBox.val('');
    descriptionBox.val('');
    var ref = database.ref('ideas');
    ref.push({title: title, description: description, isCompleted: false})
        .catch(r => alert(r));
    //console.log(title, description);
}

function clearIdeaItems(){
    $('#ideasAccordion').html('');
}

function deleteIdea(id){
    if(!confirm('Ar tikrai nori ištrinti įrašą?'))
        return;
    var ref = database.ref('ideas/'+id);
    ref.remove()
        .catch(r => alert(r));
}

function completeIdea(id){
    database.ref('ideas/'+id).once('value', function(data){
        var currData = data.val();
        database.ref('ideas/'+id).set({
           title:  currData.title,
            description: currData.description,
            isCompleted: true
        })
        .catch(r => alert(r)); 
    });
}

function appendIdeaItem(item){
    item.description = item.description.replace(/(?:\r\n|\r|\n)/g, '<br />');
    var disabled = editingEnabled ? "" : "disabled=\"disabled\"";
    var header =    '<h4 class="panel-title">' + 
                        '<a data-toggle="collapse" data-parent="#ideasAccordion" href="#collapse_'+item.id+'">' + 
                            item.title + 
                        '</a>' +
                        '<div class="btn-toolbar pull-right">' + 
                            '<button class="btn btn-xs btn-success edit-action" '+disabled+' onclick="completeIdea(\''+item.id+'\')"><span class="glyphicon glyphicon-ok"></span></button>' +
                            '<button class="btn btn-xs btn-danger edit-action" '+disabled+' onclick="deleteIdea(\''+item.id+'\')"><span class="glyphicon glyphicon-trash"></span></button>' + 
                        '</div>' +
                    '</h4>';
    if(item.isCompleted){
        header =     '<h4 class="panel-title"><del>' + 
                        '<a data-toggle="collapse" data-parent="#ideasAccordion" href="#collapse_'+item.id+'">' + 
                            item.title + 
                        '</a>' +
                        '<div class="btn-toolbar pull-right">' + 
                            //'<button class="btn btn-xs btn-warning" onclick="editIdea(\''+id+'\')"><span class="glyphicon glyphicon-pencil"></span></button>' +
                            '<button class="btn btn-xs btn-danger edit-action" '+disabled+' onclick="deleteIdea(\''+item.id+'\')"><span class="glyphicon glyphicon-trash"></span></button>' + 
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