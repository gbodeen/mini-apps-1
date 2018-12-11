const displayCSV = (resText) => {
    document.getElementById('csv-area').innerText = resText;
};

fetch('/csv')
    .then(res => res.text())
    .then(text => displayCSV(text));