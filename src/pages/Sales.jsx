import { useState } from "react";

function Sales() {
  const [customer, setCustomer] = useState("");
  const [system, setSystem] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState([]);

  const subsidy =
    Number(system) >= 3
      ? 138000
      : Number(system) === 2
      ? 110000
      : Number(system) === 1
      ? 55000
      : 0;

  const payable = (Number(price) || 0) - subsidy;

  const saveSale = () => {
  setSales([
    ...sales,
    {
      customer,
      system,
      price,
      subsidy,
      payable,
    },
  ]);

  alert("Sale Saved Successfully!");

  setCustomer("");
  setSystem("");
  setPrice("");
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>💰 Sales Management</h1>

      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      <br /><br />

      <select
        value={system}
        onChange={(e) => setSystem(e.target.value)}
      >
        <option value="">Select System Size</option>
        <option value="1">1 KW</option>
        <option value="2">2 KW</option>
        <option value="3">3 KW</option>
        <option value="5">5 KW</option>
        <option value="10">10 KW</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Total Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
<button onClick={saveSale}>
  Save Sale
</button>

<br /><br />
      <hr />

      <h2>Sale Summary</h2>

      <p><b>Customer:</b> {customer}</p>
      <p><b>System:</b> {system} KW</p>
      <p><b>Price:</b> ₹{price}</p>
      <p><b>Government Subsidy:</b> ₹{subsidy}</p>
      <p><b>Customer Payable:</b> ₹{payable}</p>
      <hr />

<h2>Sales History</h2>

{sales.map((item, index) => (
  <div key={index} style={{ marginBottom: "15px" }}>
    <b>{item.customer}</b><br />
    System: {item.system} KW<br />
    Price: ₹{item.price}<br />
    Subsidy: ₹{item.subsidy}<br />
    Payable: ₹{item.payable}
    <hr />
  </div>
))}
    </div>
  );
}

export default Sales;