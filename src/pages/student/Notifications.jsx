const Notifications = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      <ul className="space-y-3">
        <li className="border-b pb-2">📢 Exam form open</li>
        <li className="border-b pb-2">📢 Holiday tomorrow</li>
        <li className="border-b pb-2">📢 Assignment deadline</li>
      </ul>
    </div>
  );
};

export default Notifications;