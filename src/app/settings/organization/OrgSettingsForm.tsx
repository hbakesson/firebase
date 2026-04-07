"use client";

import { useState } from "react";
import { updateOrganization } from "@/lib/actions";
import { Save, CheckCircle, AlertCircle, Building, Calendar, DollarSign } from "lucide-react";

interface OrgSettings {
  name: string;
  fiscalYearStartMonth: number;
  defaultCurrency: string;
}

export default function OrgSettingsForm({ initialData }: { initialData: OrgSettings }) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await updateOrganization(formData);
      setMessage({ type: 'success', text: 'Organization settings updated successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update settings.' });
    } finally {
      setLoading(false);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label className="flex items-center gap-2">
          <Building size={16} /> Organization Name
        </label>
        <input 
          type="text" 
          className="mt-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
          <label className="flex items-center gap-2">
            <Calendar size={16} /> Fiscal Year Start
          </label>
          <select 
            className="mt-2"
            value={formData.fiscalYearStartMonth}
            onChange={(e) => setFormData({ ...formData, fiscalYearStartMonth: parseInt(e.target.value) })}
          >
            {months.map((month, i) => (
              <option key={month} value={i + 1}>{month}</option>
            ))}
          </select>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Determines the first month of your reporting periods.
          </p>
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2">
            <DollarSign size={16} /> Default Currency
          </label>
          <input 
            type="text" 
            className="mt-2"
            maxLength={3}
            value={formData.defaultCurrency}
            onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value.toUpperCase() })}
            placeholder="USD"
          />
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`} style={{ fontSize: '0.875rem' }}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}

      <button type="submit" disabled={loading} className="primary flex items-center gap-2">
        <Save size={18} />
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
