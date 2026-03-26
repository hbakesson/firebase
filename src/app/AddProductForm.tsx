"use client";

import { useRef, useState } from "react";
import { addProduct } from "./actions";

export default function AddProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addProduct(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
      }
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>Add New Product</h2>
      <form ref={formRef} action={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" name="name" placeholder="e.g. MacBook Pro" required />
          {error && <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{error}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU (Optional)</label>
          <input type="text" id="sku" name="sku" placeholder="e.g. MBP-2024" />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" min="0" defaultValue="0" required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Product
            </>
          )}
        </button>
      </form>
    </section>
  );
}
