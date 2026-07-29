import "./Header.css";

function Header() {
  const quotationNo =
    "QTN-" +
    new Date().getFullYear() +
    "-" +
    Date.now().toString().slice(-4);

  return (
    <div className="header-container">

      <div className="logo-section">
        <img
          src="/eversun-logo.png"
          alt="Eversun Energiaa"
          className="company-logo"
        />
      </div>

      <div className="company-section">
        <h1>EVERSUN ENERGIAA</h1>

        <h3>Solar EPC Company</h3>

        <p>PM Surya Ghar Muft Bijli Yojana Empanelled Vendor</p>

        <p>Bhubaneswar, Odisha</p>

        <p>Mobile : +91 7437965253</p>

        <p>Email : info@eversunenergiaa.com</p>
      </div>

      <div className="quotation-section">

        <h2>QUOTATION</h2>

        <table className="quotation-info">
          <tbody>

            <tr>
              <td><strong>Quotation No</strong></td>
              <td>{quotationNo}</td>
            </tr>

            <tr>
              <td><strong>Date</strong></td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>

          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Header;