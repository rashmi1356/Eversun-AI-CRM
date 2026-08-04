import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function AmbassadorCertificate({ data }) {
  const certificateRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");

    pdf.addImage(imgData, "PNG", 5, 5, 287, 200);

    pdf.save(`${data?.name}_Ambassador_Certificate.pdf`);
  };

  return (
    <div
      style={{
        background: "#f4f6f8",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <div
        ref={certificateRef}
        style={{
          width: "1050px",
          margin: "auto",
          background: "#ffffff",
          border: "12px solid #0B5D3B",
          borderRadius: "25px",
          padding: "40px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold Border */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
            border: "4px solid #D4AF37",
            borderRadius: "18px",
          }}
        />

        {/* Logo */}
        <img
          src="/eversun-logo.png"
          alt="Eversun Energiaa"
          style={{
            width: "120px",
            marginBottom: "10px",
          }}
        />

        <h1
          style={{
            color: "#0B5D3B",
            fontSize: "48px",
            margin: 0,
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          EVERSUN ENERGIAA
        </h1>

        <p
          style={{
            color: "#D4AF37",
            fontSize: "20px",
            marginTop: "8px",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          CLEAN ENERGY • BRIGHTER FUTURE
        </p>

        <hr
          style={{
            border: "2px solid #D4AF37",
            margin: "20px 0",
          }}
        />

        <h1
          style={{
            fontSize: "60px",
            color: "#0B5D3B",
            margin: 0,
            letterSpacing: "3px",
          }}
        >
          CERTIFICATE
        </h1>

        <h2
          style={{
            color: "#D4AF37",
            marginTop: "5px",
            letterSpacing: "5px",
          }}
        >
          OF APPRECIATION
        </h2>

        <p
          style={{
            fontSize: "22px",
            marginTop: "25px",
          }}
        >
          Proudly Presented To
        </p>

        <h1
          style={{
            fontSize: "54px",
            color: "#0B5D3B",
            margin: "10px 0",
            borderBottom: "3px solid #D4AF37",
            display: "inline-block",
            paddingBottom: "8px",
          }}
        >
          {data?.name}
        </h1>

        <p
          style={{
            fontSize: "24px",
            marginTop: "20px",
          }}
        >
          In recognition of outstanding contribution towards promoting
          renewable energy and supporting the mission of
          <b> Eversun Energiaa.</b>
        </p>
                {/* Official Ambassador Badge */}

        <div
          style={{
            marginTop: "30px",
            display: "inline-block",
            background: "#0B5D3B",
            color: "#fff",
            padding: "14px 40px",
            borderRadius: "40px",
            border: "3px solid #D4AF37",
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "2px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
          }}
        >
          ★ OFFICIAL SOLAR AMBASSADOR ★
        </div>

        <br />
        <br />

        {/* Ambassador Details */}

        <table
          style={{
            width: "90%",
            margin: "30px auto",
            borderCollapse: "collapse",
            fontSize: "22px",
            background: "#FAFAFA",
          }}
        >
          <tbody>

            <tr>
              <td
                style={{
                  padding: "15px",
                  fontWeight: "bold",
                  background: "#0B5D3B",
                  color: "#fff",
                  width: "35%",
                }}
              >
                Ambassador ID
              </td>

              <td
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                }}
              >
                {data?.ambassadorId}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "15px",
                  fontWeight: "bold",
                  background: "#0B5D3B",
                  color: "#fff",
                }}
              >
                Mobile Number
              </td>

              <td
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                }}
              >
                {data?.mobile}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "15px",
                  fontWeight: "bold",
                  background: "#0B5D3B",
                  color: "#fff",
                }}
              >
                Date of Birth
              </td>

              <td
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                }}
              >
                {data?.dob}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "15px",
                  fontWeight: "bold",
                  background: "#0B5D3B",
                  color: "#fff",
                }}
              >
                District
              </td>

              <td
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                }}
              >
                {data?.district}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "15px",
                  fontWeight: "bold",
                  background: "#0B5D3B",
                  color: "#fff",
                }}
              >
                Block
              </td>

              <td
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                }}
              >
                {data?.block}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "15px",
                  fontWeight: "bold",
                  background: "#0B5D3B",
                  color: "#fff",
                }}
              >
                Village
              </td>

              <td
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                }}
              >
                {data?.village}
              </td>
            </tr>

          </tbody>
        </table>

        <h2
          style={{
            color: "#0B5D3B",
            marginTop: "30px",
            fontSize: "30px",
          }}
        >
          🌞 Together We Build a Greener Future 🌿
        </h2>
                {/* Gold Seal */}

        <div
          style={{
            width: "180px",
            height: "180px",
            margin: "30px auto",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#FFD700,#D4AF37)",
            border: "6px solid #B8860B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#0B5D3B",
            fontWeight: "bold",
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ fontSize: "22px" }}>🏆</div>

          <div style={{ fontSize: "18px" }}>
            OFFICIAL
          </div>

          <div style={{ fontSize: "18px" }}>
            AMBASSADOR
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            EVERSUN ENERGIAA
          </div>
        </div>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
            padding: "0 60px",
          }}
        >

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "3px solid #0B5D3B",
                width: "220px",
                margin: "auto",
              }}
            />

            <h3
              style={{
                color: "#0B5D3B",
                marginBottom: "5px",
              }}
            >
              Managing Director
            </h3>

            <p>Eversun Energiaa Pvt. Ltd.</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "3px solid #0B5D3B",
                width: "220px",
                margin: "auto",
              }}
            />

            <h3
              style={{
                color: "#0B5D3B",
                marginBottom: "5px",
              }}
            >
              Head of Sales & Marketing
            </h3>

            <p>Eversun Energiaa Pvt. Ltd.</p>
          </div>

        </div>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#0B5D3B",
            color: "white",
            padding: "15px 30px",
            borderRadius: "12px",
            marginTop: "40px",
          }}
        >

          <div>
            <strong>Certificate ID:</strong>
            <br />
            {data?.ambassadorId}
          </div>

          <div>
            <strong>Date:</strong>
            <br />
            {new Date().toLocaleDateString()}
          </div>

        </div>
                <br />

        <p
          style={{
            color: "#555",
            fontSize: "18px",
            lineHeight: "32px",
            marginTop: "20px",
          }}
        >
          This certificate is proudly awarded in recognition of your dedication,
          commitment, and valuable contribution towards promoting renewable
          energy through the PM Surya Ghar Yojana and the mission of
          <strong> Eversun Energiaa.</strong>
        </p>

        <br />

        <h3
          style={{
            color: "#D4AF37",
            letterSpacing: "2px",
          }}
        >
          ★ TOGETHER WE SHINE • TOGETHER WE GROW • TOGETHER WE POWER THE FUTURE ★
        </h3>

      </div>

      <br />

      <button
        onClick={downloadPDF}
        style={{
          background: "#0B5D3B",
          color: "white",
          border: "none",
          padding: "14px 30px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
          marginRight: "15px",
        }}
      >
        📥 Download PDF
      </button>

      <button
        onClick={() => window.print()}
        style={{
          background: "#D4AF37",
          color: "#000",
          border: "none",
          padding: "14px 30px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        🖨 Print Certificate
      </button>

    </div>
  );
}

export default AmbassadorCertificate;