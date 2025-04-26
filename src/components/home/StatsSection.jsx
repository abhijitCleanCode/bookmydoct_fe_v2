import React from 'react';
import { FaUserMd, FaHospital, FaUsers } from 'react-icons/fa';

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          Making Healthcare Accessible
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Join our growing community of healthcare providers and patients across the country
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:translate-y-[-8px] transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FaUserMd className="text-primary text-3xl" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">200+</div>
            <div className="text-gray-700 font-medium text-lg">Verified Doctors</div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:translate-y-[-8px] transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FaHospital className="text-primary text-3xl" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
            <div className="text-gray-700 font-medium text-lg">Hospitals & Clinics</div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:translate-y-[-8px] transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FaUsers className="text-primary text-3xl" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
            <div className="text-gray-700 font-medium text-lg">Patients Registered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 