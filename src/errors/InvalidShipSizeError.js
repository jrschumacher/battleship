class InvalidShipSizeError extends Error {
  
  constructor (...params) {
    super(params)
    
    this.message = 'Invalid size'
  }
  
}

export default InvalidShipSizeError