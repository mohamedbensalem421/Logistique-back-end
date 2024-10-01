const errorHandler = (err,req,res,next) =>{
  const customError = {
    message: err.message || 'Quelque chose ne va pas, réessayez plus tard',
    status: err.statusCode || 500
  }
  if(err.code === 11000){
    customError.statusCode = 400
    customError.message = `Valeur dupliquée saisie pour ${Object.keys(err.keyValue)} field, please choose another value`
  }  
  if(err.name === 'ValidationError'){
    customError.statusCode = 400
    customError.message = `Veuillez fournir ${Object.values(err.errors).map((item) => item.path).join(', ')}`
  }
  if(err.name === 'CastError'){
    customError.statusCode = 404
    customError.message = `rien trouvé avec l'identifiant: ${err.value}`
  }
  return res.status(customError.status).json({msg: customError.message})
}

module.exports = errorHandler