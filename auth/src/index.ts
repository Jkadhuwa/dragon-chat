import app from './app';

const { PORT } = process.env;
app.listen(PORT || 3000, () => {
  console.log(`Server running on Port ${PORT}`);
});
