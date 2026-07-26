import { useState, useEffect } from "react";

function Leads() {
  const [employees, setEmployees] = useState([]);

const [leads, setLeads] = useState(() => {
  const savedLeads = localStorage.getItem("leads");
  return savedLeads ? JSON.parse(savedLeads) : [];
});

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    village: "",
    district: "",
    system: "",
    bill: "",
    employee: "",
    status: "New",
    
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
  // Save leads
  localStorage.setItem("leads", JSON.stringify(leads));

  // Load employees
  const users = JSON.parse(localStorage.getItem("crmUsers")) || [];

  setEmployees(
    users.filter(
      (u) =>
        u.role === "Sales Executive" ||
        u.role === "Survey Engineer" ||
        u.role === "Service Engineer"
    )
  );
}, [leads]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveLead = () => {
    if (!form.name || !form.mobile) {
      alert("Please enter Customer Name and Mobile Number");
      return;
    }

    if (editIndex !== null) {
      const updated = [...leads];
      updated[editIndex] = form;
      setLeads(updated);
      setEditIndex(null);
    } else {
      setLeads([...leads, form]);
    }

    setForm({
  name: "",
  mobile: "",
  village: "",
  district: "",
  system: "",
  bill: "",
  employee: "",
  status: "New",
});
  };

  const editLead = (index) => {
    setForm(leads[index]);
    setEditIndex(index);
  };

  const deleteLead = (index) => {
    const updated = leads.filter((_, i) => i !== index);
    setLeads(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Lead Management</h2>
            <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={form.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="village"
        placeholder="Village / City"
        value={form.village}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
      />
      <br /><br />

      <select
        name="system"
        value={form.system}
        onChange={handleChange}
      >
        <option value="">Select System Size</option>
        <option>1 KW</option>
        <option>2 KW</option>
        <option>3 KW</option>
        <option>5 KW</option>
        <option>10 KW</option>
      </select>

      <br /><br />

      <input
        type="number"
        name="bill"
        placeholder="Monthly Electricity Bill"
        value={form.bill}
        onChange={handleChange}
      /><select
  name="employee"
  value={form.employee}
  onChange={handleChange}
>
  <option value="">Assign Employee</option>

  {employees.map((emp) => (
    <option key={emp.id} value={emp.name}>
      {emp.name} ({emp.role})
    </option>
  ))}
</select>

      <br /><br />

      <button onClick={saveLead}>
        {editIndex !== null ? "Update Lead" : "Save Lead"}
      </button>

      <hr />

      <h3>Saved Leads</h3>
      

      <input
        type="text"
        placeholder="🔍 Search by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
           <th>Name</th>
<th>Mobile</th>
<th>Village</th>
<th>District</th>
<th>System</th>
<th>Bill</th>
<th>Assigned To</th>
<th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads
            .filter((lead) =>
              lead.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((lead, index) => (              <tr key={index}>
                <td>{lead.name}</td>
                <td>{lead.mobile}</td>
                <td>{lead.village}</td>
                <td>{lead.district}</td>
                <td>{lead.system}</td>
                <td>{lead.bill}</td>
                <td>{lead.employee}</td>

                <td>
                  <button
                    onClick={() => editLead(index)}
                    style={{
                      background: "#f4b400",
                      color: "black",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteLead(index)}
                    style={{
                      background: "#d32f2f",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;