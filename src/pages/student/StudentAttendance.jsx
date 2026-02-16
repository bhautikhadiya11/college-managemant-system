const Attendance = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Subject</th>
            <th className="p-2">Percentage</th>
          </tr>
        </thead>

        <tbody>
          <Row subject="Maths" percent="90%" />
          <Row subject="Java" percent="95%" />
          <Row subject="DBMS" percent="88%" />
        </tbody>
      </table>
    </div>
  );
};

const Row = ({ subject, percent }) => (
  <tr className="border-t">
    <td className="p-2">{subject}</td>
    <td className="p-2">{percent}</td>
  </tr>
);

export default Attendance;