import React from "react";

function QuotationPDF({ quotationData }) {

  if (!quotationData) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>No Quotation Found</h2>
      </div>
    );
  }

  const {
    quotationNo,
    quotationDate,
    customer,
    mobile,
    address,
    district,
    consumerNo,
    system,
    panelBrand,
    inverterBrand,
    basicAmount,
    cgst,
    sgst,
    grandTotal,
    subsidy,
    payable,
  } = quotationData;

  return (

    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "20px auto",
        background: "#fff",
        padding: "25px",
        fontFamily: "Arial",
        border: "2px solid #0B5D3B",
      }}
    >

      {/* COMPANY HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "3px solid #0B5D3B",
          paddingBottom: "15px",
        }}
      >

        <div>

          <h1
            style={{
              color: "#0B5D3B",
              margin: 0,
            }}
          >
            EVERSUN ENERGIAA
          </h1>

          <p style={{ margin: "5px 0" }}>
            PM Surya Ghar Empanelled Vendor
          </p>

          <p style={{ margin: "5px 0" }}>
            GSTIN : 21KWSPS9616E1ZW
          </p>

          <p style={{ margin: "5px 0" }}>
            Mobile : 9114624658
          </p>

          <p style={{ margin: "5px 0" }}>
            Jagatsinghpur, Odisha
          </p>

        </div>

        <div style={{ textAlign: "right" }}>

          <h2
            style={{
              color: "#0B5D3B",
            }}
          >
            QUOTATION
          </h2>

          <p>
            <b>No :</b> {quotationNo}
          </p>

          <p>
            <b>Date :</b> {quotationDate}
          </p>

        </div>

      </div>

      <br />

      {/* CUSTOMER DETAILS */}
      <table
        border="1"
        cellPadding="8"
        width="100%"
        style={{
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <tbody>

          <tr>
            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
                width: "20%",
              }}
            >
              Customer Name
            </td>

            <td width="30%">
              {customer}
            </td>

            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
                width: "20%",
              }}
            >
              Mobile
            </td>

            <td width="30%">
              {mobile}
            </td>
          </tr>

          <tr>
            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              Address
            </td>

            <td colSpan="3">
              {address}
            </td>
          </tr>

          <tr>
            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              District
            </td>

            <td>
              {district}
            </td>

            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              Consumer No.
            </td>

            <td>
              {consumerNo}
            </td>
          </tr>

          <tr>
            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              System Size
            </td>

            <td>
              {system} KW
            </td>

            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              Panel Brand
            </td>

            <td>
              {panelBrand}
            </td>
          </tr>

          <tr>
            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              Inverter Brand
            </td>

            <td>
              {inverterBrand}
            </td>

            <td
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              GSTIN
            </td>

            <td>
              21KWSPS9616E1ZW
            </td>
          </tr>

        </tbody>

      </table>

      {/* PRODUCT DETAILS */}
      <table
        border="1"
        cellPadding="8"
        width="100%"
        style={{
          borderCollapse: "collapse",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <thead
          style={{
            background: "#0B5D3B",
            color: "#fff",
          }}
        >
          <tr>
            <th>Sl. No.</th>
            <th>Particulars</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Unit Price (₹)</th>
            <th>GST %</th>
            <th>GST Amount (₹)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>1</td>
            <td>{system} KW Solar PV System</td>
            <td>1</td>
            <td>Set</td>
            <td>{basicAmount.toLocaleString("en-IN")}</td>
            <td>18%</td>
            <td>{(cgst + sgst).toLocaleString("en-IN")}</td>
            <td>{grandTotal.toLocaleString("en-IN")}</td>
          </tr>

          <tr>
            <td>2</td>
            <td>{panelBrand} Solar Panels</td>
            <td>As Required</td>
            <td>Nos.</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
          </tr>

          <tr>
            <td>3</td>
            <td>{inverterBrand} Solar Inverter</td>
            <td>1</td>
            <td>No.</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
          </tr>

          <tr>
            <td>4</td>
            <td>Module Mounting Structure</td>
            <td>1</td>
            <td>Set</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
          </tr>

          <tr>
            <td>5</td>
            <td>ACDB, DCDB, Earthing & Lightning Protection</td>
            <td>1</td>
            <td>Set</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
          </tr>

          <tr>
            <td>6</td>
            <td>Cables, Connectors & Installation</td>
            <td>1</td>
            <td>Job</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
            <td>Included</td>
          </tr>

        </tbody>

      </table>
      {/* ================= PRICE SUMMARY ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          marginTop: "20px",
        }}
      >

        {/* Amount in Words */}

        <div
          style={{
            flex: 1,
            border: "1px solid #0B5D3B",
            borderRadius: "8px",
            padding: "15px",
          }}
        >

          <h3
            style={{
              color: "#0B5D3B",
              marginTop: 0,
            }}
          >
            Amount in Words
          </h3>

          <p>
            <b>
              Rupees ______________ Only
            </b>
          </p>

          <p>
            (Amount in words can be generated automatically later.)
          </p>

        </div>

        {/* GST Summary */}

        <table
          border="1"
          cellPadding="8"
          style={{
            width: "420px",
            borderCollapse: "collapse",
          }}
        >

          <tbody>

            <tr>
              <td><b>Basic Amount</b></td>
              <td align="right">
                ₹ {basicAmount.toLocaleString("en-IN")}
              </td>
            </tr>

            <tr>
              <td>CGST (9%)</td>
              <td align="right">
                ₹ {cgst.toLocaleString("en-IN")}
              </td>
            </tr>

            <tr>
              <td>SGST (9%)</td>
              <td align="right">
                ₹ {sgst.toLocaleString("en-IN")}
              </td>
            </tr>

            <tr
              style={{
                background: "#E8F5E9",
                fontWeight: "bold",
              }}
            >
              <td>Grand Total</td>
              <td align="right">
                ₹ {grandTotal.toLocaleString("en-IN")}
              </td>
            </tr>

            <tr
              style={{
                background: "#FFF8E1",
                fontWeight: "bold",
              }}
            >
              <td>PM Surya Ghar Subsidy</td>
              <td align="right">
                ₹ {subsidy.toLocaleString("en-IN")}
              </td>
            </tr>

            <tr
              style={{
                background: "#0B5D3B",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <td>Customer Payable</td>
              <td align="right">
                ₹ {payable.toLocaleString("en-IN")}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      <br />

      {/* ================= WARRANTY ================= */}

      <div
        style={{
          border: "1px solid #0B5D3B",
          borderRadius: "8px",
          padding: "15px",
        }}
      >

        <h3 style={{ color: "#0B5D3B" }}>
          Warranty
        </h3>

        <ul>

          <li>Solar Panel Warranty – 25 Years</li>

          <li>Solar Inverter Warranty – 10 Years</li>

          <li>Installation Warranty – 5 Years</li>

          <li>Free service support as per company policy.</li>

        </ul>

      </div>
      {/* ================= BANK & TERMS ================= */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "25px",
        }}
      >

        <div
          style={{
            flex: 1,
            border: "1px solid #0B5D3B",
            borderRadius: "8px",
            padding: "15px",
          }}
        >

          <h3 style={{ color: "#0B5D3B" }}>
            🏦 Bank Details
          </h3>

          <table style={{ width: "100%" }}>
            <tbody>

              <tr>
                <td><b>Bank</b></td>
                <td>UCO Bank</td>
              </tr>

              <tr>
                <td><b>Account Name</b></td>
                <td>EVERSUN ENERGIAA</td>
              </tr>

              <tr>
                <td><b>Account No.</b></td>
                <td>17740210004203</td>
              </tr>

              <tr>
                <td><b>IFSC</b></td>
                <td>UCBA0001774</td>
              </tr>

              <tr>
                <td><b>Branch</b></td>
                <td>Baripada, Tirtol</td>
              </tr>

            </tbody>
          </table>

        </div>

        <div
          style={{
            flex: 1,
            border: "1px solid #0B5D3B",
            borderRadius: "8px",
            padding: "15px",
          }}
        >

          <h3 style={{ color: "#0B5D3B" }}>
            📋 Terms & Conditions
          </h3>

          <ol style={{ paddingLeft: "18px" }}>
            <li>Quotation validity: 15 Days.</li>
            <li>Installation after document verification.</li>
            <li>Government subsidy is subject to MNRE / PM Surya Ghar approval.</li>
            <li>Warranty as per manufacturer policy.</li>
            <li>Payment as per agreed schedule.</li>
          </ol>

        </div>

      </div>

      {/* ================= SIGNATURES ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "70px",
        }}
      >

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "200px",
              borderTop: "1px solid #000",
              marginBottom: "8px",
            }}
          />
          <b>Customer Signature</b>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "200px",
              borderTop: "1px solid #000",
              marginBottom: "8px",
            }}
          />
          <b>Authorized Signatory</b>
          <br />
          EVERSUN ENERGIAA
        </div>

      </div>

      <hr
        style={{
          marginTop: "40px",
          border: "1px solid #0B5D3B",
        }}
      />

      {/* ================= FOOTER ================= */}

      <div
        style={{
          textAlign: "center",
          color: "#0B5D3B",
        }}
      >

        <h2 style={{ marginBottom: "5px" }}>
          Thank You for Choosing EVERSUN ENERGIAA
        </h2>

        <p>
          Empowering Homes with Clean & Green Solar Energy
        </p>

        <p>
          📞 9114624658 | GSTIN: 21KWSPS9616E1ZW
        </p>

      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >

        <button
          onClick={() => window.print()}
          style={{
            background: "#0B5D3B",
            color: "#fff",
            border: "none",
            padding: "12px 35px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          🖨️ Print Quotation
        </button>

      </div>

    </div>
  );
}

export default QuotationPDF;