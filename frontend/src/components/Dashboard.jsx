import { useState, useEffect } from 'react';
import { fetchAllMedications } from '../adapters/medication-adapters';
import AddMedicationForm from './AddMedicationForm';
import MedicationList from './MedicationList';

const NAV_ITEMS = [
  { key: 'appointments', label: 'Appointments', icon: '📅' },
  { key: 'medications', label: 'Medications', icon: '💊' },
  { key: 'results', label: 'Test Results', icon: '🧪' },
  { key: 'notes', label: 'Notes', icon: '📝' },
];

const PAGE_TITLES = {
  appointments: 'Appointments',
  medications: 'My Medications',
  results: 'Test Results',
  notes: 'Doctor Notes',
};

// ── Confirm Modal ──────────────────────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Appointments Section ───────────────────────────────────────────────────────
function AppointmentsSection() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [pending, setPending] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!doctor || !date) return;
    setAppointments([...appointments, { id: Date.now(), doctor, date, reason }]);
    setDoctor(''); setDate(''); setReason('');
  };

  const handleDelete = (id) => {
    setPending(id);
  };

  return (
    <div>
      {pending && (
        <ConfirmModal
          message="Are you sure you want to delete this appointment?"
          onConfirm={() => { setAppointments(appointments.filter(a => a.id !== pending)); setPending(null); }}
          onCancel={() => setPending(null)}
        />
      )}
      <form className="section-form" onSubmit={handleAdd}>
        <div className="form-fields">
          <div>
            <label>Doctor</label>
            <input value={doctor} onChange={e => setDoctor(e.target.value)} placeholder="e.g. Dr. Smith" />
          </div>
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label>Reason</label>
            <input value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g. Checkup" />
          </div>
        </div>
        <button type="submit">Add Appointment</button>
      </form>
      <ul className="item-list">
        {appointments.map(a => (
          <li key={a.id} className="list-item">
            <span><strong>{a.doctor}</strong> — {a.date}{a.reason ? ` · ${a.reason}` : ''}</span>
            <button className="delete-btn" onClick={() => handleDelete(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Test Results Section ───────────────────────────────────────────────────────
function TestResultsSection() {
  const [results, setResults] = useState([]);
  const [test, setTest] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Normal');
  const [pending, setPending] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!test || !value) return;
    setResults([...results, { id: Date.now(), test, value, date, status }]);
    setTest(''); setValue(''); setDate(''); setStatus('Normal');
  };

  return (
    <div>
      {pending && (
        <ConfirmModal
          message="Are you sure you want to delete this test result?"
          onConfirm={() => { setResults(results.filter(r => r.id !== pending)); setPending(null); }}
          onCancel={() => setPending(null)}
        />
      )}
      <form className="section-form" onSubmit={handleAdd}>
        <div className="form-fields">
          <div>
            <label>Test Name</label>
            <input value={test} onChange={e => setTest(e.target.value)} placeholder="e.g. Blood Sugar" />
          </div>
          <div>
            <label>Result</label>
            <input value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 95 mg/dL" />
          </div>
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option>Normal</option>
              <option>Abnormal</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
        <button type="submit">Add Result</button>
      </form>
      <ul className="item-list">
        {results.map(r => (
          <li key={r.id} className="list-item">
            <span>
              <strong>{r.test}</strong> — {r.value}
              {r.date ? ` · ${r.date}` : ''}
              <span className={`status-badge status-${r.status.toLowerCase()}`}>{r.status}</span>
            </span>
            <button className="delete-btn" onClick={() => setPending(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Notes Section ──────────────────────────────────────────────────────────────
function NotesSection() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [pending, setPending] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    setNotes([...notes, { id: Date.now(), title, body }]);
    setTitle(''); setBody('');
  };

  return (
    <div>
      {pending && (
        <ConfirmModal
          message="Are you sure you want to delete this note?"
          onConfirm={() => { setNotes(notes.filter(n => n.id !== pending)); setPending(null); }}
          onCancel={() => setPending(null)}
        />
      )}
      <form className="section-form" onSubmit={handleAdd}>
        <div className="form-fields" style={{ gridTemplateColumns: '1fr 2fr' }}>
          <div>
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Post-visit summary" />
          </div>
          <div>
            <label>Note</label>
            <input value={body} onChange={e => setBody(e.target.value)} placeholder="Write your note here..." />
          </div>
        </div>
        <button type="submit">Add Note</button>
      </form>
      <ul className="item-list">
        {notes.map(n => (
          <li key={n.id} className="list-item">
            <span><strong>{n.title}</strong> — {n.body}</span>
            <button className="delete-btn" onClick={() => setPending(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
function Dashboard({ currentUser, handleLogout }) {
  const [activePage, setActivePage] = useState('appointments');
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMedications = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchAllMedications();
    if (fetchError) setError(fetchError.message);
    else setMedications(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMedications();
  }, []);

  return (
    <div id="app-shell">
      <aside id="sidebar">
        <div id="sidebar-logo">🏥 MedDash</div>
        <nav>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`nav-btn ${activePage === item.key ? 'active' : ''}`}
              onClick={() => setActivePage(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <button id="logout-btn" onClick={handleLogout}>Log Out</button>
      </aside>

      <div id="main-content">
        <header id="topbar">
          <h1>{PAGE_TITLES[activePage]}</h1>
          <span id="welcome-user">Welcome, <strong>{currentUser.username}</strong>!</span>
        </header>

        <div id="page-content">
          {activePage === 'appointments' && <AppointmentsSection />}
          {activePage === 'medications' && (
            <div>
              <AddMedicationForm loadMedications={loadMedications} />
              {isLoading && <p>Loading medications...</p>}
              {error && <p className="error">Something went wrong: {error}</p>}
              <MedicationList medications={medications} loadMedications={loadMedications} />
            </div>
          )}
          {activePage === 'results' && <TestResultsSection />}
          {activePage === 'notes' && <NotesSection />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;