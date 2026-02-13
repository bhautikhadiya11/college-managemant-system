const StudentHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Welcome Student 🎓
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Card title="Attendance" value="92%" />
        <Card title="Notifications" value="3 New" />
        <Card title="Subjects" value="6 Active" />

      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default StudentHome;