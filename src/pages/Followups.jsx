import { useState } from "react";

function FollowUps() {
  const [form, setForm] = useState({
    customer: "",
  });

  const [followups, setFollowups] = useState([]);

  const saveFollowUp = () => {
    setFollowups([...followups, form]);

    alert("Follow-up Saved!");

    setForm({
      customer: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📞 Follow-up Management</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={form.customer}
        onChange={(e) =>
          setForm({ customer: e.target.value })
        }
      />

      <br /><br />

      <button onClick={saveFollowUp}>
        Save Follow-up
      </button>

      <hr />

      <h3>Saved Follow-ups</h3>

      {followups.map((item, index) => (
        <p key={index}>
          Customer: {item.customer}
        </p>
      ))}
    </div>
  );
}

export default FollowUps;