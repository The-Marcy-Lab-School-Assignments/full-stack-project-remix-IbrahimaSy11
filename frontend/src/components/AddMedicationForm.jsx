import { createMedication } from '../adapters/medication-adapters';

function AddMedicationForm({ loadMedications }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const dosage = form.elements.dosage.value;
    const frequency = form.elements.frequency.value;
    if (!name) return;
    const { error } = await createMedication(name, dosage, frequency);
    if (error) return console.error(error);
    await loadMedications();
    form.reset();
  };

  return (
    <form id="add-medication-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        <div>
          <label htmlFor="name-input">Medication Name:</label>
          <input type="text" name="name" id="name-input" placeholder="e.g. Metformin" />
        </div>
        <div>
          <label htmlFor="dosage-input">Dosage:</label>
          <input type="text" name="dosage" id="dosage-input" placeholder="e.g. 500mg" />
        </div>
        <div>
          <label htmlFor="frequency-input">Frequency:</label>
          <input type="text" name="frequency" id="frequency-input" placeholder="e.g. Twice daily" />
        </div>
      </div>
      <button type="submit">Add Medication</button>
    </form>
  );
}

export default AddMedicationForm;