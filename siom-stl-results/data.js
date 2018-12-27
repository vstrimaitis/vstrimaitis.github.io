var ANSWERS = [
    {
        label: "Negirdėta",
        color: "#e6194B"
    },
    {
        label: "Girdėta, bet turiu minimaliai praktikos",
        color: "#f58231"
    },
    {
        label: "Girdėta ir dažniausiai mokėčiau pritaikyti",
        color: "#ffe119"
    },
    {
        label: "Gerai išmanau ir moku naudotis",
        color: "#3cb44b"
    }
];

function fetchData() {
    var URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzATvBv7XJL9frOFFfi-rnnCq354TKT69H1S_lw8MEUbdt5wO4JLCRtzts867qEwVmoO34xQjgRXoM/pub?gid=1329162626&single=true&output=csv";
    return fetch(URL, {mode: "cors"})
    .then(response => {
        if(response.status !== 200) {
            throw Error(response.statusText);
            return;
        }
        return response.text();
    })
    .then(extractData)
    .catch(err => console.error("Fetch error", err))
}

function extractData(text) {
    var PATTERN = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    lines = text.split("\n");
    lines = lines.map(l => l.split(PATTERN).map(fixQuotes)).map(l => l.slice(1, l.length-1));
    headers = lines[0];
    answerCount = lines.length-1; // -1 for the headers line
    counts = {};
    for(var i = 0; i < headers.length; i++) {
        counts[headers[i]] = {};
        for(var j = 0; j < ANSWERS.length; j++) {
            counts[headers[i]][ANSWERS[j].label] = 0;
        }
    }

    for(var i = 1; i < lines.length; i++) {
        for (var j = 0; j < lines[i].length; j++) {
            counts[headers[j]][lines[i][j]]++;
        }
    }
    return {answerCount: answerCount, headers: headers, data: counts};
}

function fixQuotes(str) {
    if (str[0] === '"' && str[str.length-1] === '"') {
        str = str.substr(1, str.length-2);
    }
    return str;
}

function buildChartData(data) {
    var labels = data.headers;
    datasets = ANSWERS.map(answer => ({
        label: answer.label,
        backgroundColor: answer.color,
        data: Object.keys(data.data)
                    .map(k => data.data[k][answer.label])
    }));
    return {labels: labels, datasets: datasets};
}