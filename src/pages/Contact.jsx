import ContactPage from "../components/ContactPage";

const Contact = () => {
  return (
    <>
   
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Contact Us</h1>
       <ContactPage/>
      <p className="mt-4 text-gray-600">
        Email: college@gmail.com | Phone: 9876543210
      </p>
    </div>
    </>
  );
};

export default Contact;
