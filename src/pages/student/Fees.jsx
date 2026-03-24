const Fees = () => {
  const fees = [
    { semester: "Sem 1", status: "Paid", amount: "₹25,000" },
    { semester: "Sem 2", status: "Pending", amount: "₹25,000" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Fees Details
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Semester</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {fees.map((f, i) => (
            <tr key={i} className="text-center hover:bg-gray-50">
              <td className="p-3 border">{f.semester}</td>
              <td className="p-3 border">{f.amount}</td>
              <td className={`p-3 border font-bold ${
                f.status === "Paid" ? "text-green-600" : "text-red-600"
              }`}>
                {f.status}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default Fees;