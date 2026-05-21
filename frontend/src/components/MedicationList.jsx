import MedicationItem from './MedicationItem';

function MedicationList({ medications, loadMedications }) {
  return (
    <ul id="medication-list">
      {medications.map((medication) => (
        <MedicationItem
          key={medication.medication_id}
          medication={medication}
          loadMedications={loadMedications}
        />
      ))}
    </ul>
  );
}

export default MedicationList;