var express = require('express');
var app = express();
var employees = [{ id: "X103", name: "John Smith", salary: 45000 },
{ id: "XT92", name: "Mary Murphy", salary: 41750 },
{ id: "B10C", name: "Alan Collins", salary: 40000 },
{ id: "YY12", name: "Brian Brogan", salary: 43250 }];
var markup = "<h1>Question 1</h1>"
let ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const { check, validationResult } = require('express-validator');

app.set('view engine', 'ejs');


app.listen(3004, () => {
    console.log('App runnning at port 3004!');
})

app.get('/', (req, res) => {
    res.redirect('/employees');

  })

  app.get('/employees', (req,res) => {
    res.send(employees);
  })

  app.get('/employees/:id', (req,res) => {
      console.log('Parameter = ', req.params.id);
      var idToFind = req.params.id;

      var employee = employees.find((e) => {
            if(e.id.localeCompare(idToFind) == 0){
                return e;
            }
      })
      if (employee == undefined){
          res.send("<h1>Error: Employee ID" + idToFind + " not found");
      } else {
          res.send(employee);
      }
  })

  app.get('/addEmployee', (req,res) => {
      res.render('addEmployee', {errors: undefined});
  })

  app.post('/addEmployee',
  [
      check('id').isLength({min:1}).withMessage('Please enter id: ')
  ],
  (req, res) => {
      var errors = validationResult(req);
      console.log("errors" + errors.isEmpty());
      console.log(errors.errors);
      employees.push(req.body);
      res.render('addEmployees', {errors: errors.errors});
  });





