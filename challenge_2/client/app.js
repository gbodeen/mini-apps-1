const displayCSV = (resText) => {
  document.getElementById('csv-area').innerText = resText;
};

const displayDownloadLink = () => {
  document.getElementById('download').style.visibility = 'visible';
}

const reader = new FileReader();

const handleFileSelect = (e) => {
  reader.readAsText(e.target.files[0]);
  reader.onload = () => {
    document.getElementById('json').value = reader.result;
  };
}

const fetchCSV = () => {
  fetch('/csv')
    .then(res => res.text())
    .then(text => displayCSV(text));
}

const addListeners = () => {
  document.getElementById('picker').addEventListener('change', handleFileSelect);

  document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(document.getElementById('json').value);
    fetchCSV();
  });
}

fetchCSV();
addListeners();