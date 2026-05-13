// REMIX: renamed from todoControllers.js to medicationControllers.js
// REMIX: require medicationModel instead of todoModel
const medicationModel = require('../models/medicationModel');

// REMIX: renamed from listTodos to listMedications
module.exports.listMedications = async (req, res, next) => {
  try {
    // unchanged — still gets resources by user_id from the session
    const medications = await medicationModel.listByUser(req.session.user_id);
    res.send(medications);
  } catch (err) {
    next(err);
  }
};

// REMIX: renamed from createTodo to createMedication
module.exports.createMedication = async (req, res, next) => {
  try {
    // REMIX: destructuring name, dosage, frequency instead of just title
    const { name, dosage, frequency } = req.body;

    // REMIX: validating all three required fields instead of just title
    if (!name || !dosage || !frequency) {
      return res.status(400).send({ error: 'Name, dosage, and frequency are required.' });
    }

    // REMIX: passing name, dosage, frequency to create instead of just title
    const medication = await medicationModel.create(name, dosage, frequency, req.session.user_id);
    res.status(201).send(medication);
  } catch (err) {
    next(err);
  }
};

// REMIX: renamed from updateTodo to updateMedication
module.exports.updateMedication = async (req, res, next) => {
  try {
    // REMIX: changed todo_id -> medication_id in req.params
    const { medication_id } = req.params;

    // REMIX: changed todoModel.find -> medicationModel.find
    const medication = await medicationModel.find(medication_id);

    // REMIX: updated error messages to say medication instead of todo
    if (!medication) return res.status(404).send({ error: 'Medication not found.' });
    if (medication.user_id !== req.session.user_id) {
      return res.status(403).send({ error: 'Not authorized.' });
    }

    const updatedMedication = await medicationModel.update(medication_id, req.body);
    res.send(updatedMedication);
  } catch (err) {
    next(err);
  }
};

// REMIX: renamed from deleteTodo to deleteMedication
module.exports.deleteMedication = async (req, res, next) => {
  try {
    // REMIX: changed todo_id -> medication_id in req.params
    const { medication_id } = req.params;

    // First find the medication to verify ownership — unchanged pattern
    const medication = await medicationModel.find(medication_id);

    // REMIX: updated error messages to say medication instead of todo
    if (!medication) return res.status(404).send({ error: 'Medication not found.' });
    if (medication.user_id !== req.session.user_id) {
      return res.status(403).send({ error: 'Not authorized.' });
    }

    // Destroy the medication only after ownership has been verified — unchanged pattern
    const destroyedMedication = await medicationModel.destroy(medication_id);
    res.send(destroyedMedication);
  } catch (err) {
    next(err);
  }
};