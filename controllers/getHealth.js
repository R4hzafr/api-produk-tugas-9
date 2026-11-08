
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'api-produk-tugas-9',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
};

module.exports = getHealth;
