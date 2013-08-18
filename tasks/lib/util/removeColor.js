function removeColor(str) {
  if (typeof str === 'string') {
    return str.replace(/\x1B\[\d+m/g, '');
  }
  return str;
}

module.exports = removeColor;