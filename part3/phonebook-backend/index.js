const express = require('express')
const app = express()


let persons= [
    {
        "name": "asdff",
        "number": "12551",
        "id": "befb"
    },
    {
        "id": "72f5",
        "name": "asssss",
        "number": "22213124"
    },
    {
        "name": "a321",
        "number": "3253525",
        "id": "0669"
    },
    {
        "name": "12",
        "number": "643534",
        "id": "110c"
    },
    {
        "name": "ffe",
        "number": "214",
        "id": "892f"
    },
    {
        "id": "52be",
        "name": "fda",
        "number": "123"
    },
    {
        "id": "1018",
        "name": "fad",
        "number": "324"
    },
    {
        "id": "143a",
        "name": "12123123",
        "number": "4142142"
    },
    {
        "id": "58cb",
        "name": "1231414",
        "number": "fafdasdf"
    },
    {
        "id": "7e49",
        "name": "Chris",
        "number": "123124124"
    }
    ]

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        name: request.body.name,
        number: request.body.number,
        id: generateId(),
    }
    console.log("person", person)

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        console.log('x')
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})