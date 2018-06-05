class InvalidShipNameError extends Error {
  
  constructor (...params) {
    super(params)
    
    this.message = 'Invalid name'
  }
  
}

export default InvalidShipNameError