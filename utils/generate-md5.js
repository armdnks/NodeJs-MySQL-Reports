const generateMD5 = () => {
  const char4 = () => Math.random().toString(16).slice(-4);
  return char4() + char4() + char4() + char4() + char4();
};

module.exports = generateMD5;
