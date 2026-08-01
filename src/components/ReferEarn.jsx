import React from "react";

const ReferEarn = () => {
  const referralCode = "EVS000125";

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#0B8F4D" }}>Refer & Earn</h2>

      <p>
        Invite your friends and family to install solar with
        <strong> Eversun Energiaa</strong> and earn exciting rewards.
      </p>

      <div
        style={{
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <h3>Your Referral Code</h3>

        <h1 style={{ color: "#0B8F4D", letterSpacing: "2px" }}>
          {referralCode}
        </h1>

        <button
          onClick={() => {
            navigator.clipboard.writeText(referralCode);
            alert("Referral Code Copied!");
          }}
          style={{
            background: "#0B8F4D",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Copy Referral Code
        </button>
      </div>

      <div style={{ marginTop: "25px" }}>
        <h3>Referral Summary</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>
                Total Referrals
              </td>
              <td style={{ padding: "10px" }}>08</td>
            </tr>

            <tr>
              <td style={{ padding: "10px" }}>
                Successful Installations
              </td>
              <td style={{ padding: "10px" }}>05</td>
            </tr>

            <tr>
              <td style={{ padding: "10px" }}>
                Pending Referrals
              </td>
              <td style={{ padding: "10px" }}>03</td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Total Rewards Earned
              </td>
              <td
                style={{
                  padding: "10px",
                  color: "#0B8F4D",
                  fontWeight: "bold",
                }}
              >
                ₹10,000
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "25px",
          textAlign: "center",
        }}
      >
        <button
          style={{
            background: "#1976D2",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Refer a Friend
        </button>
      </div>
    </div>
  );
};

export default ReferEarn;