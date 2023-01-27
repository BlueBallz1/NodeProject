/* eslint-disable no-unused-vars */
const {NO_CONTENT,BAD_REQUEST,UNAUTHORIZADE,FORBIDEN,NOT_FOUND,CONFLICT,SERVER_ERROR} = require('./error.codes');


class ApiError extends Error {
  constructor(message, status){
    super(message);
    this.status = status;
  }
}


class NoContent extends Error {
  constructor(message){
    super(message);
    this.status = NO_CONTENT;
  }

}

class BadRequest extends Error{
  constructor(message){
    super(message);
    this.status = BAD_REQUEST;
  }
}


class Unautorizade extends Error{
  constructor(message){
    super(message);
    this.status = UNAUTHORIZADE;
  }
}

  
class Forbiden extends Error{
  constructor(message){
    super(message);
    this.status = FORBIDEN;
  }
}


class NotFound extends Error{
  constructor(message){
    super(message);
    this.status = NOT_FOUND;
  }
}

class Conflict extends Error{
  constructor(message){
    super(message);
    this.status = CONFLICT;
  }
}

class ServerError extends Error{
  constructor(message){
    super(message);
    this.status = SERVER_ERROR;
  }
}

module.exports = {
  ApiError,
  NoContent,
  BadRequest,
  Unautorizade,
  Forbiden,
  NotFound,
  Conflict,
  ServerError
};

