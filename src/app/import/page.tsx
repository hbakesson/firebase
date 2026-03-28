"use client";

import { useState } from "react";
import { parse } from "papaparse";
import { importActuals } from "@/lib/actions";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Table as TableIcon
} from "lucide-react";

interface CSVRow {
  [key: string]: string | undefined;
}

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CSVRow[]>([]);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'ready' | 'importing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setStatus('parsing');
      
      parse(selected, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data as CSVRow[]);
          setStatus('ready');
        },
        error: (err) => {
          setError(err.message);
          setStatus('error');
        }
      });
    }
  };

  const handleImport = async () => {
    setStatus('importing');
    try {
      // Map data to the format expected by the server action
      // Expected columns: projectCode, periodId, hours
      const rows = data.map((row: CSVRow) => ({
        projectCode: row.projectCode || row.Code || row.ProjectCode || "",
        periodId: row.periodId || row.Period || row.PeriodId || "",
        hours: parseFloat(row.hours || row.Hours || row.ActualHours || "0") || 0
      })).filter(r => r.projectCode && r.periodId);

      if (rows.length === 0) throw new Error("No valid data rows found. Check column headers (projectCode, periodId, hours).");

      await importActuals(rows);
      setStatus('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during import.");
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="header-row">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <Upload size={32} className="text-indigo-400" />
            Actuals Importer
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Bulk upload real-world hours from your tracking software (CSV).</p>
        </div>
      </div>

      <div className="card" style={{ padding: '3rem', border: '2px dashed var(--card-border)', textAlign: 'center' }}>
        <input 
          type="file" 
          id="csv-upload" 
          accept=".csv" 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <label htmlFor="csv-upload" style={{ cursor: 'pointer' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <FileText size={64} className="mx-auto text-indigo-400 opacity-50" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {file ? file.name : "Choose CSV File or drag and drop"}
          </div>
          <p style={{ color: "var(--text-muted)", maxWidth: '300px', margin: '0 auto' }}>
            Format should include: projectCode, periodId, and hours.
          </p>
        </label>

        {status === 'ready' && (
          <div style={{ marginTop: '2rem' }}>
            <div className="user-badge" style={{ marginBottom: '1rem' }}>
              <CheckCircle2 size={16} /> {data.length} records found
            </div>
            <button onClick={handleImport} className="btn-sm" style={{ padding: '0.75rem 2rem', background: 'var(--primary)', color: 'white' }}>
              Start Import
            </button>
          </div>
        )}

        {status === 'importing' && (
          <div style={{ marginTop: '2rem' }}>
            <Loader2 size={32} className="animate-spin mx-auto text-indigo-400" />
            <p style={{ marginTop: '1rem' }}>Processing batch import...</p>
          </div>
        )}

        {status === 'success' && (
          <div style={{ marginTop: '2rem' }}>
            <CheckCircle2 size={48} className="mx-auto text-green-500" />
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '1rem' }}>Import Complete!</div>
            <p style={{ color: "var(--text-muted)" }}>Actuals are now reflected in your reports.</p>
            <button onClick={() => window.location.href = '/reports'} className="secondary btn-sm" style={{ marginTop: '1rem' }}>
              View Reports
            </button>
          </div>
        )}

        {status === 'error' && (
          <div style={{ marginTop: '2rem' }}>
            <AlertCircle size={48} className="mx-auto text-red-500" />
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '1rem' }}>Import Failed</div>
            <p style={{ color: "var(--text-red)" }}>{error}</p>
            <button onClick={() => setStatus('idle')} className="secondary btn-sm" style={{ marginTop: '1rem' }}>
              Try Again
            </button>
          </div>
        )}
      </div>

      {status === 'ready' && data.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.02)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TableIcon size={18} /> Preview (First 5 Rows)
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', fontSize: '0.8rem', background: 'rgba(0,0,0,0.1)' }}>
                {Object.keys(data[0]).map(k => <th key={k} style={{ padding: '0.75rem 1rem' }}>{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--card-border)', fontSize: '0.875rem' }}>
                  {Object.values(row).map((v, j) => <td key={j} style={{ padding: '0.75rem 1rem' }}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
