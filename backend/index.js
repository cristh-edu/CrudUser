// config inicial
const express = require('express')
const app = express()

// depois do db
const mongoose = require('mongoose')

const User = require('./models/User')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas
app.post('/user', async (req, res) => {
  const { name, email } = req.body

  const user = {
    name,
    email,
  }

  try {
    await User.create(user)

    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/user', async (req, res) => {
  try {
    const people = await User.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/user/:id', async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOne({ _id: id })

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.patch('/user/:id', async (req, res) => {
  const id = req.params.id

  const { name, email } = req.body

  const user = {
    name,
    email,
  }

  try {
    const updatedemail = await User.updateOne({ _id: id }, user)

    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/user/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ _id: id })

  if (!user) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await User.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

mongoose
  .connect(
    'mongodb+srv://cristh:VQZ5L9bWVw7Avn6P@clusterrest.bv78q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))