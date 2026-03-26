"use client";

import { useState } from "react";
import { deleteProduct, updateQuantity } from "./actions";

type Product = {
  id: string;
  name: string;
  sku: string | null;
  quantity: number;
  createdAt: Date;
};

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState("");

  const filteredProducts = initialProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.sku?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section>
      <div className="search-bar">
        <span className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input 
          type="text" 
          placeholder="Search items..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card" style={{ padding: "0" }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{product.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Added {new Date(product.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td><span className="sku">{product.sku || "—"}</span></td>
                    <td>
                      <div className={`quantity-badge ${product.quantity < 5 ? 'quantity-low' : 'quantity-ok'}`}>
                        {product.quantity}
                      </div>
                    </td>
                    <td>
                      <div className="actions" style={{ justifyContent: "flex-end" }}>
                        <button className="secondary" onClick={() => updateQuantity(product.id, -1)} disabled={product.quantity === 0}>-</button>
                        <button className="secondary" onClick={() => updateQuantity(product.id, 1)}>+</button>
                        <button className="danger" onClick={() => {
                          if (confirm("Delete this product?")) deleteProduct(product.id);
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">
                    {search ? "No products match your search." : "No products found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
