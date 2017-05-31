// Initialise sources and gifs
for(var i = 0; i < animations.length; i++){
    var htmls = createButton(animations[i]);
    $('#buttons_column').append(htmls.button);
    $('#output_column').append(htmls.output);
}

$(document).ready(function(){
    $('#output_column').children().hide();
});

function createButton(animation){
    var buttonHtml = '<button type="button" class="btn btn-default btn-lg btn-block" onclick="showOutput(\''+animation.Folder+'\')">'+animation.Name+'</button>';
    var gifHtml = '<image class="animation_gifs img-responsive" src="animations/'+animation.Folder+'/out.gif"></image>';
    var sourceHtml = '<pre class="language-latex" data-src="animations/'+animation.Folder+'/source.tex"></pre>';
    var outputHtml = '<div id="'+animation.Folder+'">'+gifHtml+sourceHtml+'</div>';
    console.log(outputHtml);
    return {button: buttonHtml, output: outputHtml};
}

function showOutput(animId){
    $('#output_column').children().hide();
    $('#'+animId).fadeIn('slow');
}