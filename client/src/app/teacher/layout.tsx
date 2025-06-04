
const TeacherLayout = ( {children}: Readonly<{ children: React.ReactNode;}> ) => {
  return (
    <div className="flex ctm-height" >
        <div className="flex-1 p-4" >
            <div className=" p-3 h-full bg-slate-50 rounded-md" >
               {children} 
            </div>
        </div>
    </div>
  )
}

export default TeacherLayout