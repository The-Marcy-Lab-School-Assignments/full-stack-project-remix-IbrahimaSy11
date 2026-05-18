// REMIX: renamed from AddTodoForm.jsx to AddMedicationForm.jsx
// REMIX: replaced createTodo with createMedication
import { createMedication } from '../adapters/medication-adapters';

// REMIX: renamed from AddTodoForm to AddMedicationForm
// REMIX: renamed prop from loadTodos to loadMedications
function AddMedicationForm({ loadMedications }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // REMIX: getting name, dosage, frequency from form instead of just title
    const name = form.elements.name.value;
    const dosage = form.elements.dosage.value;
    const frequency = form.elements.frequency.value;

    // REMIX: validating all three fields instead of just title
    if (!name || !dosage || !frequency) return;

    // REMIX: calling createMedication with name, dosage, frequency instead of createTodo with title
    const { error } = await createMedication(name, dosage, frequency);
    if (error) return console.error(error);

    // REMIX: calls loadMedications instead of loadTodos
    await loadMedications();
    form.reset();
  };

  return (
    // REMIX: renamed id from add-todo-form to add-medication-form
    <form id="add-medication-form" onSubmit={handleSubmit}>
      {/* REMIX: three inputs instead of one — name, dosage, frequency */}
      <label htmlFor="name-input">Medication Name:</label>
      <input type="text" name="name" id="name-input" placeholder="e.g. Metformin" />

      <label htmlFor="dosage-input">Dosage:</label>
      <input type="text" name="dosage" id="dosage-input" placeholder="e.g. 500mg" />

      <label htmlFor="frequency-input">Frequency:</label>
      <input type="text" name="frequency" id="frequency-input" placeholder="e.g. Twice daily" />

      <button type="submit">Add Medication</button>
    </form>
  );
}

export default AddMedicationForm;