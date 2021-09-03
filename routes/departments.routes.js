const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {

  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.get('/departments/:id', async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.post('/departments', async (req, res) => {  //korzystając z metody async...await - przechowujemy kod w bloku try..catch - pozwala to wyłapywać błędy

  try {

    const { name } = req.body;  // wyciąga parametr name z req.body
    const newDepartment = new Department({ name: name });  // tworzy nowy dokument na bazie modelu Department
    await newDepartment.save();  // save = zapisz dokument w kolekcji
    res.json({ message: 'OK' });  // oczekuje na wykonanie metody (await) i jeśli jest dobrze to zwraca komunikat OK

  } catch (err) {
    res.status(500).json({ message: err });
  }

});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      await Department.updateOne({ _id: req.params.id }, { $set: { name: name } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/departments/:id', async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
