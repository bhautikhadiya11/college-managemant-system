const Assignment = () => {
  const assignments = [
    { subject: "Java", title: "OOP Concepts", due: "25 Feb" },
    { subject: "DBMS", title: "Normalization", due: "28 Feb" },
    { subject: "Web Dev", title: "React Gallery", due: "2 Mar" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Assignments
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Subject</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Due Date</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((a, i) => (
            <tr key={i} className="text-center hover:bg-gray-50">
              <td className="p-3 border">{a.subject}</td>
              <td className="p-3 border">{a.title}</td>
              <td className="p-3 border">{a.due}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default Assignment;