const displayCSV = (resText) => {
    document.getElementById('csv-area').innerText = resText;
};

const reader = new FileReader();

const handleFileSelect = (e) => {
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
        document.getElementById('json').value = reader.result;
    };
}


fetch('/csv')
    .then(res => res.text())
    .then(text => displayCSV(text));

document.getElementById('picker').addEventListener('change', handleFileSelect);