function QuotationPDF({ quotationData }) {
  const {
  customer,
  mobile,
  address,
  system,
  price,
  subsidy,
  payable,
  date,
} = quotationData || {};
  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        margin: "20px auto",
        background: "#fff",
        padding: "40px",
        border: "2px solid #0B5D3B",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0B5D3B" }}>
        EVERSUN ENERGIAA
      </h1>

      <h2 style={{ textAlign: "center" }}>
        Solar System Quotation
      </h2>

      <p style={{ textAlign: "center" }}>
        PM Surya Ghar Empanelled Vendor
        <br />
        Mobile: 7437965253
      </p>

      <hr />

      <table style={{ width: "100%", marginTop: "20px" }}>
        <tbody>
          <tr>
            <td><strong>Quotation No.</strong></td>
            <td>ES-2026-0001</td>

            <td><strong>{date}</strong></td>
            <td>{new Date().toLocaleDateString()}</td>
          </tr>

          <tr>
            <td><strong>{customer}</strong></td>
            <td>______</td>

            <td><strong>{mobile}</strong></td>
            <td>______</td>
          </tr>

          <tr>
            <td><strong>{address}</strong></td>
            <td colSpan="3">
              _______________
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>₹{price}</td>
            <td>2,10,000</td>
          </tr>

          <tr>
            <td>₹{subsidy}</td>
            <td>1,38,000</td>
          </tr>

          <tr>
            <td><strong>₹{payable}</strong></td>
            <td><strong>72,000</strong></td>
          </tr>
        </tbody>
      </table>

      <br />

      <h3>Terms & Conditions</h3>

      <ol>
        <li>Prices are inclusive of standard installation.</li>
        <li>Government subsidy is subject to approval.</li>
        <li>Warranty as per manufacturer policy.</li>
      </ol>

      <br /><br /><br />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          ________
          <br />
          Customer Signature
        </div>

        <div>
          ________
          <br />
          Authorized Signature
        </div>
      </div>
    </div>
  );
}

export default QuotationPDF;