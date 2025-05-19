"use client";

import MainButton from "@/components/MainButton";
import { useEffect, useState } from "react";
import AddSubject from "./AddSubject";
import { CiSearch } from "react-icons/ci";
import SubjectCard from "./SubjectCard ";
import { Axios } from "@/axios/Axios";
import { SubjectTypes } from "@/types/Types";
import Spiner from "@/components/Spiner";



const page = () => {

  const [showModal, setShowModal] = useState(false);

   const [subjects, setSubjects] = useState<SubjectTypes[]>([]);
    const [loading, setLoading] = useState(false);
  
    const getSubjects = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`user/get-subjects`);
  
        setSubjects(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getSubjects();
    }, []);

  return (
    <div>
      <div className="">
        <div className="mb-4 flex items-center flex-col sm:flex-row justify-between">
          <h3 className="text-2xl font-medium text-hoverLinkColor">
            المواد الدراسية 
          </h3>
          <div onClick={() => setShowModal(true)}>
            <MainButton text="اضف مادة" />
          </div>
        </div>

        <div>
          <form className="w-full bg-white p-2 rounded-md flex items-center border mb-5">
            <input
              type="text"
              className="block flex-1"
              placeholder="ادخل اسم المادة"
            />
            <button className="flex items-center justify-center border border-primary1 text-2xl font-semibold p-1 rounded-md bg-primary1 text-white ">
              <CiSearch />
            </button>
          </form>
        </div>

        {loading ? (<Spiner />) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
           {subjects.map((subject) => (
             <SubjectCard
               key={subject._id}
               name={subject.name}
               image={subject.image}
             />
           ))}
         </div>
        )}
      </div>
      {showModal && <AddSubject closeModal={setShowModal} />}
    </div>
  );
};

export default page;
