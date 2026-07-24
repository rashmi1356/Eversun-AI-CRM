import { useState } from "react";
import "./Quotations.css";

function Quotations({
  customers,
  setCustomers,
  setQuotationData,
  setPage,
}) {
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [system, setSystem] = useState("3");
  const [price, setPrice] = useState("");

  const subsidy =
    Number(system) >= 3
      ? 138000
      : Number(system) === 2
      ? 110000
      : Number(system) === 1
      ? 55000
      : 0;

  const payable = (Number(price) || 0) - subsidy;

  const saveQuotation = () => {
    const newQuotation = {
      customer,
      mobile,
      address,
      system,
      price,
      subsidy,
      payable,
      date: new Date().toLocaleDateString(),
    };

    const updatedCustomers = [...customers, newQuotation];

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );

    alert("Quotation Saved Successfully!");
  };
  return (
  <div className="quotation-container">

    <h1>EVERSUN ENERGIAA</h1>

    <h2>Solar System Quotation</h2>

    <p>
      PM Surya Ghar Empanelled Vendor
      <br />
      Mobile: 7437965253
    </p>

    <input
      type="text"
      placeholder="Customer Name"
      value={customer}
      onChange={(e) => setCustomer(e.target.value)}
    />

    <input
      type="text"
      placeholder="Mobile Number"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
    />

    <input
      type="text"
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />

    <select
      value={system}
      onChange={(e) => setSystem(e.target.value)}
    >
      <option value="1">1 kW</option>
      <option value="2">2 kW</option>
      <option value="3">3 kW</option>
      <option value="5">5 kW</option>
      <option value="10">10 kW</option>
    </select>

    <input
      type="number"
      placeholder="Total Project Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />

    <div className="summary-box">
      <h2>Quotation Summary</h2>

      <p><strong>Customer:</strong> {customer}</p>

      <p><strong>Mobile:</strong> {mobile}</p>

      <p><strong>Address:</strong> {address}</p>

      <p><strong>System Size:</strong> {system} kW</p>

      <p><strong>Total Price:</strong> ₹{price || 0}</p>

      <p><strong>Government Subsidy:</strong> ₹{subsidy}</p>

      <h3 style={{ color: "#0B5D3B" }}>
        Customer Payable: ₹{payable}
      </h3>
    </div>

    <button onClick={saveQuotation}>
      💾 Save Quotation
    </button>

    <button
      style={{ marginLeft: "10px" }}
      onClick={() => {
        setQuotationData({
          customer,
          mobile,
          address,
          system,
          price,
          subsidy,
          payable,
        });
        setPage("quotationpdf");
      }}
    >
      🖨️ Print Quotation
    </button>
    <hr />

    <h2 style={{ marginTop: "30px" }}>
      Saved Customers
    </h2>

    {customers.length === 0 ? (
      <p>No customers saved yet.</p>
    ) : (
      customers.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{item.customer}</h3>

          <p><b>Mobile:</b> {item.mobile}</p>

          <p><b>Address:</b> {item.address}</p>

          <p><b>System:</b> {item.system} kW</p>

          <p><b>Price:</b> ₹{item.price}</p>
        </div>
      ))
    )}

  </div>
);
}

export default Quotations;