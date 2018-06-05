class InvalidMoveError extends Error {
  
  constructor (...params) {
    super(params)
    
    this.message = 'Invalid move'
  }
  
}

export default InvalidMoveError