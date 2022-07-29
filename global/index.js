function generateResponse(status, message, data) {
    return {
        status,
        message,
        data // burda da obyekt gondere bilersen 
    }
}

export default generateResponse;