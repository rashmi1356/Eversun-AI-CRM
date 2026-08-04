import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function FollowUps() {

  const followupRef = collection(db, "followups");

  const selectedLead = JSON.parse(
    localStorage.getItem("selectedLead") || "{}"
  );

  const [followups, setFollowups] = useState([]);

  const [form, setForm] = useState({
    customer: selectedLead.name || "",
    mobile: selectedLead.mobile || "",
    village: selectedLead.village || "",
    district: selectedLead.district || "",
    system: selectedLead.system || "",

    followupDate: new Date()
      .toISOString()
      .split("T")[0],

    nextFollowup: "",

    time: "",

    status: "Pending",

    remarks: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Load Follow-up History
  const loadFollowups = async () => {
    try {

      const q = query(
        followupRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Show only follow-ups of the selected customer
      setFollowups(
        list.filter(
          (item) =>
            item.mobile === selectedLead.mobile
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFollowups();
  }, []);

  // Save Follow-up
  const saveFollowUp = async () => {

    if (
      !form.customer ||
      !form.mobile
    ) {
      alert("Customer Name and Mobile Number are required.");
      return;
    }

    try {

      await addDoc(followupRef, {
        ...form,
        createdAt: serverTimestamp(),
      });

      alert("✅ Follow-up Saved Successfully");

      setForm({
        ...form,
        followupDate: new Date()
          .toISOString()
          .split("T")[0],
        nextFollowup: "",
        time: "",
        status: "Pending",
        remarks: "",
      });

      loadFollowups();

    } catch (error) {
      console.log(error);
      alert("Error saving follow-up.");
    }
  };
  return (
    <div style={{ padding: "20px" }}>

      <h2>📞 Follow-up Management</h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >

        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={form.customer}
          readOnly
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          readOnly
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="village"
          placeholder="Village"
          value={form.village}
          readOnly
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="district"
          placeholder="District"
          value={form.district}
          readOnly
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="system"
          placeholder="System Size"
          value={form.system}
          readOnly
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Follow-up Date</label>

        <input
          type="date"
          name="followupDate"
          value={form.followupDate}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Follow-up Time</label>

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Next Follow-up Date</label>

        <input
          type="date"
          name="nextFollowup"
          value={form.nextFollowup}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="Pending">🟡 Pending</option>
          <option value="Interested">🟢 Interested</option>
          <option value="Site Visit">🏠 Site Visit</option>
          <option value="Quotation Sent">📄 Quotation Sent</option>
          <option value="Sale Closed">✅ Sale Closed</option>
          <option value="Not Interested">❌ Not Interested</option>
        </select>

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={saveFollowUp}
          style={{
            background: "#0B5D3B",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          💾 Save Follow-up
        </button>

      </div>
      <h3>📋 Follow-up History</h3>

      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{
          borderCollapse: "collapse",
          background: "#fff",
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
  <th>Date</th>
  <th>Time</th>
  <th>Status</th>
  <th>Next Follow-up</th>
  <th>Remarks</th>
</tr>
        </thead>

        <tbody>

          {followups.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                }}
              >
                No Follow-up History Found
              </td>
            </tr>

          ) : (

            followups.map((item, index) => (

              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>{item.followupDate}</td>

                <td>{item.time}</td>

                <td>{item.status}</td>

                <td>{item.nextFollowup}</td>

                <td>{item.remarks}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default FollowUps;