var puzzle;
var removalPattern = /[ \.\,]/g

window.onload = function(){
    function readUrl(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#srcImage').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#imageInput').change(function(){
        readUrl(this);
    });
    $('#imageInput').change();

    $('#inputWord').on('input', function(e){
        var inputText = this.value;
        if(inputText.length === 0 || puzzle.length === 0){
            clearHighlight();
            return;
        }
        findWord();
    });

    $('#recognizeButton').on('click', function() {
        var $this = $(this);
        var image = document.getElementById('srcImage');
        if(!image.hasAttribute('src')){
            alert('No image selected!');
            return;
        }

        Tesseract.recognize(image, {lang: 'lit'}).progress(function(){
            $this.button('loading');
        }).then(function(result){
            console.log(result.text);
            console.log(result.text.replace(removalPattern, ''));
            $this.button('reset');
            var lines = result.text.replace(removalPattern, '');
            if(/\d+/.test(lines)){
                lines = lines.replace(/[oO]/g, '0');
                lines = lines.replace(/[l]/g, '1');
                lines = lines.replace(/[z]/g, '2');
                lines = lines.replace(/[A]/g, '4');
                lines = lines.replace(/[Ss]/g, '5');
                lines = lines.replace(/[T]/g, '7');
                lines = lines.replace(/[g]/g, '8');
                lines = lines.replace(/[q]/g, '9');
                if(/\D+/.test(lines.split('\n').join(''))){
                    alert("Reading failed, please provide a better image :/");
                    return;
                }
            }
            lines = lines.split('\n');
            puzzle = [];
            for(var i = 0; i < lines.length; i++){
                var splitLine = lines[i].split('');
                if(splitLine.length > 0)
                    puzzle.push(splitLine);
            }
            $('#output').html(toTable(puzzle));
            //$('#searchButton').prop('disabled', false);
        });
    });
};

function clearHighlight(){
    for(var i = 0; i < puzzle.length; i++)
        for(var j = 0; j < puzzle[i].length; j++)
            $('#cell-'+i+'-'+j).removeClass('highlighted');
}

function findWord(){
    clearHighlight();
    var word = document.getElementById('inputWord').value.toUpperCase();
    var res = findWordCells(puzzle, word);
    if(res.length > 0){
        for(var i = 0; i < res.length; i++)
            $('#cell-'+res[i].y+'-'+res[i].x).addClass('highlighted');
    }
}

function findWordCells(board, word){
    var len = word.length;
    var wordRev = word.split('').reverse().join('');
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length-len+1; j++){
            var ans = [];
            for(var jj = j; jj < j + len; jj++){
                if(board[i][jj] === word[jj-j])
                    ans.push({y: i, x: jj});
                else break;
            }
            if(ans.length === len)
                return ans;
            ans = [];
            for(var jj = j; jj < j + len; jj++){
                if(board[i][jj] === wordRev[jj-j])
                    ans.push({y: i, x: jj});
                else
                    break;
            }
            if(ans.length === len)
                return ans;
        }
    }

    for(var i = 0; i < board.length-len+1; i++){
        for(var j = 0; j < board[i].length; j++){
            var ans = [];
            for(var ii = i; ii < i + len; ii++){
                if(board[ii][j] === word[ii-i])
                    ans.push({y: ii, x: j});
                else
                    break;
            }
            if(ans.length === len)
                return ans;

            ans = [];
            for(var ii = i; ii < i + len; ii++){
                if(board[ii][j] === wordRev[ii-i])
                    ans.push({y: ii, x: j});
                else
                    break;
            }
            if(ans.length === len)
                return ans;
        }
    }
    return [];
}

function toTable(arr){
    var html = '<table id="puzzleTable" class="table table-condensed table-nonfluid">';
    for(var i = 0; i < arr.length; i++){
        html += '<tr>';
        for(var j = 0; j < arr[i].length; j++){
            html += '<td id="cell-'+i+'-'+j+'">' + arr[i][j] + '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}
