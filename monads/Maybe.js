class Maybe {

  static just(a) {
    return new Just(a);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNulable(a) {
    return a !== null ? just(a) : nothing();
  }

  static of(a) {
    return just(a);
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return false;
  }
}

class Just extends Maybe {
  constructor(value) {
    super();
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map(f) {
    return of(f(this._value));
  }

  getOrElse() {
    return this._value;
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return true;
  }
}

class Nothing extends Maybe {
  map(f) {
    return this; // noop
  }

  get value() {
    throw new TypeError(`Can't extract the value of Nothing.`);
  }

  getOrElse(other) {
    return other;
  }

  get isNothing() {
    return true;
  }

  get isJust() {
    return false;
  }
}
