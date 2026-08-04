import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

function AmbassadorList({ setPage, setAmbassadorData }) {

  const ambassadorRef = collection(db, "ambassadors");

  const [ambassadors, setAmbassadors] = useState([]);
  const [search, setSearch] = useState("");

  const loadAmbassadors = async () => {
    try {

      const q = query(
        ambassadorRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAmbassadors(list);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAmbassadors();
  }, []);
  const filteredAmbassadors = ambassadors.filter((item) => {

    const keyword = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.mobile?.includes(search) ||
      item.ambassadorId?.toLowerCase().includes(keyword)
    );

  });

  const deleteAmbassador = async (id) => {

    if (!window.confirm("Delete this Ambassador?")) return;

    try {

      await deleteDoc(doc(db, "ambassadors", id));

      alert("Ambassador Deleted Successfully.");

      loadAmbassadors();

    } catch (error) {

      console.log(error);

      alert("Error deleting Ambassador.");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>🌞 Ambassador List</h2>

      <br />

      <input
        type="text"
        placeholder="Search by Name / Mobile / ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />
      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead
          style={{
            background: "#0B5D3B",
            color: "white",
          }}
        >
          <tr>
            <th>Ambassador ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>District</th>
            <th>Block</th>
            <th>Village</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredAmbassadors.length === 0 ? (

            <tr>
              <td colSpan="8">
                No Ambassador Found
              </td>
            </tr>

          ) : (

            filteredAmbassadors.map((item) => (

              <tr key={item.id}>

                <td>{item.ambassadorId}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td>{item.district}</td>
                <td>{item.block}</td>
                <td>{item.village}</td>
                <td>{item.status}</td>

                <td>

                  <button
                    style={{
                      background: "#0B5D3B",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
  setAmbassadorData(item);
  setPage("ambassadorcertificate");
}}
                  >
                    Certificate
                  </button>

                  <button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      deleteAmbassador(item.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default AmbassadorList;