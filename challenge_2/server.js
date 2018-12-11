const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hostname = 'localhost';
const data = { objects: [], keys: [], csv: '' };

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.post('/json', express.urlencoded({ extended: true }), (req, res) => {
    console.log(req.body);
    handleNewJSON(req.body.json);
    res.redirect('/');
});

app.get('/csv', (req, res) => {
    res.send(data.csv);
})

app.listen(port, hostname);

const handleNewJSON = (json) => {
    const newObj = tryParsingJSON(json);
    if (newObj) {
        data.objects = updateDataObjects(newObj, data.objects);
        data.keys = updateDataKeys(data.objects);
        data.csv = updateDataCSV(data.keys, data.objects);
    }
}

const tryParsingJSON = (maybeJSON = '') => {
    try {
        json = JSON.parse(maybeJSON);
    }
    catch (err) {
        console.log('BROKEN JSON', maybeJSON);
        json = null;
    }
    return json;
};

const updateDataObjects = (newRootObj, objects) => {
    objects.push(newRootObj);
    if (newRootObj.hasOwnProperty('children')) {
        newRootObj.children.forEach(child => {
            updateDataObjects(child, objects);
        });
    }
    return objects;
};

const updateDataKeys = (objects) => {
    const withRepeats = objects.reduce((keys, obj) => {
        return keys.concat(Object.keys(obj));
    }, []);
    const withoutRepeats = new Set(withRepeats);
    withoutRepeats.delete('children');
    return [...withoutRepeats];
}

const updateDataCSV = (keys, objects) => {
    const header = keys.join(',');
    const body = [header];
    let row;
    for (let obj of objects) {
        row = [];
        for (let key of keys) {
            row.push(obj.hasOwnProperty(key) ? obj[key] : '');
        }
        body.push(row.join(','));
    }
    return body.join('\n');
};
