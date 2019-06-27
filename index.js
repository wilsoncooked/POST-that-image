const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const formidable = require('formidable');
let company = '';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Welcome to the dojo');
});
app.get('/api/v1/company/images', (req, res) => {
  res.send('Company ' + company);
});

app.post('/api/v1/company/image', (req, res) => {
  var form = new formidable.IncomingForm();
  var ourFile = '';
  form.parse(req, function(err, fields, files) {
    company = fields.companyName;
  });

  form.on('fileBegin', function(name, file) {
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', function(name, file) {
    ourFile = file.name;
    res.send('Uploaded ' + ourFile + ' image for ' + company);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
