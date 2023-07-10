if (!Array.prototype.toReversed) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.toReversed = function () {
    return this.slice().reverse()
  }
}
