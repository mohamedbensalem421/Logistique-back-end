const mongoose = require('mongoose')
const validator = require('validator')
const FretSchema = new mongoose.Schema({
  nom:{
    type: String,
    required: [true, 'Veuillez fournir nom']
  },
  email:{
    type: String,
    required: [true, 'Veuillez fournir email'],
    validate:{
      validator: validator.isEmail,
      message: 'Veuillez fournir valide email'
    }
  },
  telephone:{
    type: Number,
    required: [true, 'Veuillez fournir numéro de téléphone']
  },
  livraison:{
    type: String,
    required: [true, 'Veuillez fournir ville de livraison']
  },
  depart:{
    type: String,
    required: [true, 'Veuillez fournir ville de depart']
  },
  hauteur:{
    type: Number,
    required: [true, 'Veuillez fournir hauteur']
  },
  poids:{
    type: Number,
    required: [true, 'Veuillez fournir poids']
  },
  fret:{
    type: String,
    required: [true, 'Veuillez fournir fret'],
    enum: ['Fret Aérien','Fret Routier', 'Fret Maritime']
  },
})

module.exports = mongoose.model('Fret', FretSchema)