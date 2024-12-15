const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB...'));

// Importing data from JSON file
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfuly loadedd!');
  } catch (err) {
    console.error('Error in importing data', err);
  }
};
importData();
