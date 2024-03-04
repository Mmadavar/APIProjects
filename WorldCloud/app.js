
anychart.onDocumentReady(function() {
    // Create a tag (word) cloud chart
    var chart = anychart.tagCloud();
    chart.title('Synonyms');
    chart.angles([0]);
    chart.colorRange(true);
    chart.colorRange().length('80%');

    // Placeholder for setting data later
    window.updateChart = function(data) {
        chart.data(data);
        chart.container("container");
        chart.draw();
    };
});


document.getElementById("submit").addEventListener("click", generate)
async function generate() {
    const word = document.getElementById("word").value;
    const settings = {

        async: true,
        crossDomain: true,
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9bc231e98fmsha3ea8c6b5adc241p12b154jsn5e7aace6392e',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        display(response.synonyms);
    });
}

function display(synonyms) {
    const data = synonyms.map(function(word) {
        // Map each synonym to an object with format {x: synonym, value: someValue}
        return {x: word, value: Math.floor(Math.random() * 10) + 1};
        // Value could be a constant or based on some criteria
    });

    if (data.length <= 0) {
        document.getElementById("container").innerText = 'No words available';
    } else {
        window.updateChart(data);
    }
}



/*
function display(synonyms) {
    const collection = document.getElementById("synonyms");
    if (synonyms.length <= 0) {
        collection.innerText = 'No words available';
    } else {
        synonyms.forEach(d => {
            const elem = document.createElement('div')
            elem.innerText = d;
            collection.appendChild(elem)
            list.push(elem)
            console.log(list)
        })
    }


}*/
