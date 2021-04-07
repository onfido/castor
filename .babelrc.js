// only instrument code if e2e testing with Cypress
if (process.env.NODE_ENV === 'e2e')
  module.exports = {
    plugins: ['istanbul'],
  };
