// module.exports = (func) => {
//   return (req, res, next) => func(req, res, next).catch((err) => next(err));
// };
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
