const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hostname = 'localhost';
const csv = { data: '' };

// app.use(express.static('client/app.js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/client/app.js');
})

app.post('/json', express.urlencoded({ extended: true }), (req, res) => {
    const json = tryParsingJSON(req.body.json);
    // console.log(json);
    csv.data = jsonToCSV(json);
    res.redirect('/');
});

app.get('/csv', (req, res) => {
    res.send(csv.data);
})

app.listen(port, hostname);

const tryParsingJSON = (maybeJSON = '', next) => {
    try {
        json = JSON.parse(maybeJSON);
    }
    catch (err) {
        console.log('BROKEN JSON: ', err);
    }
    return json;
};

const jsonToCSV = (json) => {
    const keys = getAllKeys(json);
    // console.log('in jsonToCSV:  ', keys);
    const objs = getAllObjects(json);

    let newCSV;
    if (csv.data.length) {
        newCSV = csv.data.split('\n');
    } else {
        newCSV = [keys];
    }

    let row = [];
    for (let obj of objs) {
        row = [];
        for (let key of keys) {
            obj.hasOwnProperty(key) ? row.push(obj[key]) : row.push('');
        }
        newCSV.push(row.join(','));
    }

    return newCSV.join('\n');
}

const getAllKeys = (obj, keys = []) => {
    // EXCEPT for the key "children"
    keys = new Set([...keys, ...Object.keys(obj)]);

    if (keys.has('children')) {
        keys.delete('children');
        obj.children.forEach(child => {
            keys = getAllKeys(child, keys)
        });
    }

    // console.log([...keys]);
    return [...keys];
}

const getAllObjects = (root, objs = []) => {
    objs.push(root);
    if (root.hasOwnProperty('children')) {
        root.children.forEach(child => {
            getAllObjects(child, objs);
        })
    }
    return objs;
}

// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line 
// of CSV report (see included sample output), where the keys of the JSON objects will be the columns 
// of the CSV report.
// You may assume the JSON data has a regular structure and hierarchy (see included sample file). In 
// other words, all sibling records at a particular level of the hierarchy will have the same set of 
// properties, but child objects might not contain the same properties. In all cases, every property 
// you encounter must be present in the final CSV output.
// You may also assume that child records in the JSON will always be in a property called `children`.

