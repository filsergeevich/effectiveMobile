module.exports.formatResponse = ({ statusCode, message, data = null, error = null }) => ({
  statusCode,
  message,
  data,
  error,
});
