export class User {
  constructor(
    public email: string,
    public id: string,
    public _token: string,
    public _tokenExpiryDate: Date
  ) { }

  get token() {
    if (!this._tokenExpiryDate || new Date() > this._tokenExpiryDate) {
      return null;
    }
    return this._token;
  }
}
