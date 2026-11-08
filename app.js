const healthRoutes = require('./routes/healthRoutes');
const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/products', productRoutes);
app.use('/health', healthRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
