import React from 'react';
import { MapPin, Mail, Phone, Landmark } from 'lucide-react'; // Using Lucide icons for a modern React look

const ContactPage = () => {
  const contactData = [
    {
      title: "Campus Address",
      icon: <MapPin className="text-white w-6 h-6" />,
      content: "SILVEROAK CAMPUS AND RESEARCH FOUNDATION, 352/353, 370/LJ Campus, LJ University Rd, off Sarkhej - Gandhinagar Highway, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 382210, GOTA GAM, AHMEDABAD, Gujarat, India, 382481.",
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
                    ) : (
                      <p key={i} className={item.isEmail ? "text-blue-600" : ""}>{line}</p>
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
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe 
            title="Campus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3015525546!2d72.5298113758872!3d23.086082213812546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e839e24f74d4d%3A0xc392e22f25a95627!2sSilver%20Oak%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;