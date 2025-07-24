import { Axios } from '@/axios/Axios';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import { toast } from 'react-toastify';

const StatsSection: React.FC = () => {

  const [users, setUsers] = useState(0)
  const [teachers, setTeachers] = useState(0)
  const [lessons, setLessons] = useState(0)

  const getStatics = async () => {
    try {

        const res = await Axios.get('user/get-statics-num')

        setTeachers(res.data.data.teachers)
        setUsers(res.data.data.users)
        setLessons(res.data.data.lessons)
      
    } catch  {}
  }

  useEffect(() => {
    getStatics()
  }, [])

  return (
    <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-8 animate__animated animate__fadeIn animate__delay-1s">
            عن المنصة 
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Total Users */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-500 hover:bg-blue-100 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="flex items-center justify-center mb-4 text-4xl text-indigo-600">
              <FaUsers />
            </div>
            <h3 className="text-2xl font-semibold mb-2">إجمالي المستخدمين</h3>
            <p className="text-4xl font-bold"> {users} </p>
            <p className="text-sm text-gray-500">عدد المستخدمين المسجلين في المنصة</p>
          </div>

          {/* Total Teachers */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-500 hover:bg-teal-100 animate__animated animate__fadeInUp animate__delay-3s">
            <div className="flex items-center justify-center mb-4 text-4xl text-teal-600">
              <FaChalkboardTeacher />
            </div>
            <h3 className="text-2xl font-semibold mb-2">إجمالي المعلمين</h3>
            <p className="text-4xl font-bold"> {teachers} </p>
            <p className="text-sm text-gray-500">عدد المعلمين الذين يقدمون دروسًا</p>
          </div>

          {/* Total Lessons */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transform transition duration-500 hover:bg-indigo-100 animate__animated animate__fadeInUp animate__delay-4s">
            <div className="flex items-center justify-center mb-4 text-4xl text-purple-600">
              <FaBook />
            </div>
            <h3 className="text-2xl font-semibold mb-2">إجمالي الدروس</h3>
            <p className="text-4xl font-bold"> {lessons} </p>
            <p className="text-sm text-gray-500">عدد الدروس المتوفرة للطلاب</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
