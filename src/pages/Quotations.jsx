import { useState } from "react";
import "./Quotations.css";
import Header from "../components/Header";

function Quotations({
  customers,
  setCustomers,
  setQuotationData,
  setPage,
}) {
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [consumerNo, setConsumerNo] = useState("");

  const [system, setSystem] = useState("3");
  const [panelBrand, setPanelBrand] = useState("Waaree");
  const [inverterBrand, setInverterBrand] = useState("Luminous");

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

  const quotationNo =
    "QTN-" +
    new Date().getFullYear() +
    "-" +
    Date.now().toString().slice(-4);

  const saveQuotation = () => {
    const newQuotation = {
      quotationNo,
      customer,
      mobile,
      address,
      district,
      consumerNo,
      system,
      panelBrand,
      inverterBrand,
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

    <Header />
      <div className="quotation-header">

        <div className="company-details">

          <h1>EVERSUN ENERGIAA</h1>

          <p>PM Surya Ghar Empanelled Vendor</p>

          <p>Mobile : 7437965253</p>

        </div>

        <div className="quotation-info">

          <p>
            <strong>Quotation No :</strong> {quotationNo}
          </p>

          <p>
            <strong>Date :</strong>{" "}
            {new Date().toLocaleDateString()}
          </p>

        </div>

      </div>

      <hr />

      <h2>Customer Information</h2>

      <div className="form-grid">

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

        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />

        <input
          type="text"
          placeholder="Consumer Number"
          value={consumerNo}
          onChange={(e) => setConsumerNo(e.target.value)}
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

        <select
          value={panelBrand}
          onChange={(e) => setPanelBrand(e.target.value)}
        >
          <option>Waaree</option>
          <option>Adani</option>
          <option>Premier</option>
          <option>Loom Solar</option>
        </select>

        <select
          value={inverterBrand}
          onChange={(e) => setInverterBrand(e.target.value)}
        >
          <option>Luminous</option>
          <option>Livguard</option>
          <option>Growatt</option>
          <option>Solis</option>
        </select>

        <input
          type="number"
          placeholder="Total Project Cost (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <hr />

      <h2 style={{ color: "#0B5D3B" }}>
        Quotation Details
      </h2>

      <table className="quotation-table">
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Particulars</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Rate (₹)</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>1</td>
            <td>
              {system} kW {panelBrand} Solar PV Modules
            </td>
            <td>1</td>
            <td>Set</td>
            <td>₹ -</td>
            <td>₹ -</td>
          </tr>

          <tr>
            <td>2</td>
            <td>
              {system} kW {inverterBrand} On-Grid Inverter
            </td>
            <td>1</td>
            <td>No.</td>
            <td>₹ -</td>
            <td>₹ -</td>
          </tr>

          <tr>
            <td>3</td>
            <td>
              BOS Kit (Module Mounting Structure, AC/DC Cable,
              ACDB, DCDB, Earthing Kit, Lightning Arrester,
              MC4 Connectors, Conduit Pipe, Cable Ties,
              Fasteners & Accessories, Installation,
              Testing & Commissioning)
            </td>
            <td>1</td>
            <td>Set</td>
            <td>₹ -</td>
            <td>₹ -</td>
          </tr>

        </tbody>
      </table>

      <div className="summary-box">

        <h2 style={{ color: "#0B5D3B" }}>
          Quotation Summary
        </h2>

        <p>
          <strong>Total Project Cost :</strong>
          ₹{Number(price || 0).toLocaleString("en-IN")}
        </p>

        <p>
          <strong>Government Subsidy :</strong>
          ₹{subsidy.toLocaleString("en-IN")}
        </p>

        <hr />

        <h2 style={{ color: "#0B5D3B" }}>
          Customer Payable :
          ₹{payable.toLocaleString("en-IN")}
        </h2>

      </div>
      <div className="footer-section">

        <h3 style={{ color: "#0B5D3B" }}>
          Warranty
        </h3>

        <ul>
          <li>Solar PV Modules : 25 Years Performance Warranty</li>
          <li>On-Grid Inverter : As per Manufacturer Warranty</li>
          <li>BOS Kit : Standard Manufacturer Warranty</li>
        </ul>

        <h3 style={{ color: "#0B5D3B", marginTop: "20px" }}>
          Terms & Conditions
        </h3>

        <ul>
          <li>Price includes supply, BOS Kit, installation, testing and commissioning.</li>
          <li>Government subsidy will be provided as per PM Surya Ghar Yojana guidelines.</li>
          <li>Net Meter approval is subject to DISCOM rules.</li>
          <li>This quotation is valid for 15 days from the date of issue.</li>
        </ul>

        <h3 style={{ color: "#0B5D3B", marginTop: "20px" }}>
          Bank Details
        </h3>

        <p><strong>Account Name :</strong> EVERSUN ENERGIAA</p>
        <p><strong>Bank Name :</strong> ________</p>
        <p><strong>Account Number :</strong> ________</p>
        <p><strong>IFSC Code :</strong> ________</p>

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={saveQuotation}>
          💾 Save Quotation
        </button>

        <button
          onClick={() => {
            setQuotationData({
              quotationNo,
              customer,
              mobile,
              address,
              district,
              consumerNo,
              system,
              panelBrand,
              inverterBrand,
              price,
              subsidy,
              payable,
              date: new Date().toLocaleDateString(),
            });

            setPage("quotationpdf");
          }}
        >
          🖨️ Print Quotation
        </button>
      </div>

      <hr />

      <h2>Saved Quotations</h2>

      {customers.length === 0 ? (
        <p>No quotations available.</p>
      ) : (
        customers.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{item.customer}</h3>

            <p>
              <strong>Quotation No:</strong> {item.quotationNo}
            </p>

            <p>
              <strong>Mobile:</strong> {item.mobile}
            </p>

            <p>
              <strong>System:</strong> {item.system} kW
            </p>

            <p>
              <strong>Total Cost:</strong> ₹
              {Number(item.price).toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Payable Amount:</strong> ₹
              {Number(item.payable).toLocaleString("en-IN")}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Quotations;