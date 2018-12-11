const httpGetAsync = (theUrl, callback) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};

const displayCSV = (resText) => {
    document.getElementById('csv-area').innerText = resText;
};

setTimeout(() => {
    httpGetAsync('/csv', displayCSV);
}, 50);

