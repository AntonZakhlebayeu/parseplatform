const healthController = {
  healthChecker: (req, res) => {
    res.status(200).json({
      message: 'Health check'
    });
  },
}

module.exports = healthController;
