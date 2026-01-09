import React from 'react';
import { MapPin, Mail, Phone, Landmark } from 'lucide-react'; // Using Lucide icons for a modern React look

const ContactPage = () => {
  const contactData = [
    {
      title: "Campus Address",
      icon: <MapPin className="text-white w-6 h-6" />,
      content: "LJ COLLEGE OF COMPUTER APPLICATIONS,NEAR IIMA,IIM ROAD, VASTRAPUR, AHMEDABAD, Gujarat, India, 380015.",
      color: "text-red-800"
    },
    {
      title: "Email Address",
      icon: <Mail className="text-white w-6 h-6" />,
      content: ["info@https://www.ljku.edu.in/.ac.in", " "],
      isEmail: true,
      color: "text-red-800"
    },
    {
      title: "Phone Numbers",
      icon: <Phone className="text-white w-6 h-6" />,
      content: ["079-35201300", "079-66046300", "+91 9099063464"],
      isContact:true,
      color: "text-red-800"
    },
    {
      title: "For Admissions Contact",
      icon: <Landmark className="text-white w-6 h-6" />,
      content: [
        { name: "Ms. Neetu Singh", phone: "+91 9909002189" },
        { name: "Mrs. Anjelina Rockinson", phone: "+91 7383541939" }
      ],
      isAdmissions: true,
      color: "text-red-800"
    }
  ];

  return (
    
    <div className='text-center bg-gray-50 '> <h1 className='font-bold text-blue-950 text-4xl '>Contact Us</h1>
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-7xl mx-auto">
        
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 text-center border-t-4 border-blue-900 shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-md">
                {item.icon}
              </div>
              <h3 className={`text-xl font-bold ${item.color} mb-4`}>{item.title}</h3>
              
              <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                {Array.isArray(item.content) ? (
                  item.content.map((line, i) => (
                    item.isAdmissions ? (
                      <div key={i} className="mb-3">
                        <p className="font-semibold text-gray-800">{line.name}</p>
                        <p className="text-blue-600">{line.phone}</p>
                      </div>
                    ) :
                     
                     (
                      <p key={i} className={item.isEmail ? "text-blue-600" : ""}>{line}</p>,
                      <p key={i} className={item.isContact ? 'text-blue-600' : ""}>{line}</p>

                    )
                  ))
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Section */}
        <div className="w-full h-`[450px]` rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
              title="LJ College of Computer Applications Map"
              src="https://www.google.com/maps?q=LJ+College+of+Computer+Applications,+Vastrapur,+Ahmedabad&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;