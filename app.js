require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectDB = require('./db/connect')
const Fret = require('./models/Fret')
const errorHandler = require('./errors/error-handler')
const cors = require('cors')
const CustomError = require('./errors/custom-error')
const app = express()

app.use(express.json())
app.use(cors())
app.get('/api/v1/frets' , async (req,res) =>{
  const fret = await Fret.find({})
  res.json(fret)
})
app.post('/api/v1/frets' , async(req,res) =>{
  if(req.body.telephone.length < 10){
    throw new CustomError('le numéro de téléphone ne peut pas être inférieur à 10 chiffres', 400)
  }
  if(req.body.telephone.length > 10){
    throw new CustomError('le numéro de téléphone ne peut pas contenir plus de 10 chiffres', 400)
  }
  const fret = await Fret.create(req.body)
  res.json({msg: "Merci d'avoir soumis votre demande de devis !"})
})
app.delete('/api/v1/frets/:id' , async(req,res) =>{
  await Fret.findByIdAndDelete(req.params.id)
  res.json('fret deleted')
})
app.use(errorHandler)
app.use('*', (req,res) => res.send('not found'))
const port = 3000 || process.env.PORT
const start = async () =>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is up on port ${port}`))
  } catch (error) {
    console.log(error);
  }
}
start()