class InvalidBoardSizeError extends Error {
  
  constructor (...params) {
    super(params)
    
    this.message = 'Invalid board size'
  }
  
}

export default InvalidBoardSizeError