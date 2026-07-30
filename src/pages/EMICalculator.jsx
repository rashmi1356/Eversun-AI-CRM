import React, { useState } from "react";

export default function EMICalculator() {
  const [projectCost, setProjectCost] = useState(210000);
  const [subsidy, setSubsidy] = useState(138000);
  const [interest, setInterest] = useState(6);
  const [years, setYears] = useState(10);

  const loanAmount = Math.max(projectCost - subsidy, 0);

  const monthlyRate = interest / 12 / 100;
  const months = years * 12;

  const emi =
    monthlyRate === 0
      ? loanAmount / months
      : (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div style={{ padding: 20 }}>
      <h2>💰 EMI Calculator</h2>

      <label>Project Cost (₹)</label><br />
      <input
        type="number"
        value={projectCost}
        onChange={(e) => setProjectCost(Number(e.target.value))}
      />

      <br /><br />

      <label>Government Subsidy (₹)</label><br />
      <input
        type="number"
        value={subsidy}
        onChange={(e) => setSubsidy(Number(e.target.value))}
      />

      <br /><br />

      <label>Bank Interest Rate</label>
<br />

<select
  value={interest}
  onChange={(e) => setInterest(Number(e.target.value))}
>
  <option value={5.75}>5.75%</option>
  <option value={6}>6.00%</option>
  <option value={6.5}>6.50%</option>
  <option value={7}>7.00%</option>
  <option value={8}>8.00%</option>
</select>

      <br /><br />

      <label>Loan Tenure (Years)</label><br />
      <input
        type="number"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
      />
      <label>Loan Tenure</label>
<br />

<select
  value={years}
  onChange={(e) => setYears(Number(e.target.value))}
>
  <option value={1}>1 Year</option>
  <option value={2}>2 Years</option>
  <option value={3}>3 Years</option>
  <option value={5}>5 Years</option>
  <option value={7}>7 Years</option>
  <option value={10}>10 Years</option>
</select>

      <hr />

      <h3>Loan Amount: ₹{loanAmount.toLocaleString("en-IN")}</h3>
      <h3>Monthly EMI: ₹{emi.toFixed(2)}</h3>
      <h3>Total Interest: ₹{totalInterest.toFixed(2)}</h3>
      <h3>Total Payment: ₹{totalPayment.toFixed(2)}</h3>
    </div>
  );
}