const express = require('express')
const morgan = require('morgan');
const app = express()

const cors = require('cors')

app.use(cors())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

 app.use(express.json())


    morgan.token('body', (req) => {
     return JSON.stringify(req.body);
     }); 

    app.use(morgan(':method :url :status :response-time ms - :body  '));


app.get('/info', (req, res) => {
  let currentDate = new Date()
       res.send('  <p>Phoebook has info for ' + persons.length + ' people </p> <div>' + currentDate + '</div>')

    });


app.get('/api/persons', (req, res) => {
  res.json(persons)

})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)
  
   if (person) {
  response.json(person)
   
  } else {
    response.status(404).end()
  }
})



 const generatedId = () => {
    const ranId = Math.floor(100*Math.random())
    return String(ranId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }

  if (persons.find(person=>person.name === body.name)){
return response.status(400).json({
      error: 'name must be unique',
    })
    
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generatedId(),
  }

  
  persons = persons.concat(person)

  response.json(person)
})

  app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
