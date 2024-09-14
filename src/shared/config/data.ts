interface Data<T> extends Response {
  _data?: T;
}

export interface IResponse<T> {
  response: Data<T>;
}
