"use client"

import CardStatics from "./components/CardStatics"
import StaticsSkeleton from "../../skeletons/StaticsSkeleton"
import { useTeacherStore } from "@/store/teacherStore"
import { useEffect } from "react"

const Page = () => {
 
    const { getTeacherStatics, teacherStatics, isFetchingTeacherStatics } = useTeacherStore();

    useEffect(() => {
      getTeacherStatics()
    }, [])

    if(isFetchingTeacherStatics){
      return (
        <>
            <StaticsSkeleton />
            <StaticsSkeleton />
        </>
      )
    }

    console.log(teacherStatics)

  return (
    <div>
            { teacherStatics &&( <> 
                  <CardStatics 
                        title="الدروس"
                        subTitle="دروس"
                        link="أضف درس"
                        href="add-lesson"
                        contentView="lessons"
                        allLength={teacherStatics?.videosLength}
                        firstLevel={teacherStatics?.firstLevelVideosLength}
                        secondLevel={teacherStatics?.secondLevelVideosLength}
                        thirdLevel={teacherStatics?.thirdLevelVideosLength}
                   />

                    <CardStatics 
                        title="الاختبارات"
                        subTitle="اختبارات"
                        link="أضف اختبار"
                        href="add-quize"
                        contentView="quizzes"
                        allLength={teacherStatics?.quizzesLength}
                        firstLevel={teacherStatics?.firstLevelQuizzesLength}
                        secondLevel={teacherStatics?.secondLevelQuizzesLength}
                        thirdLevel={teacherStatics?.thirdLevelQuizzesLength}
                    />

                    <CardStatics 
                        title="المذكرات"
                        subTitle="مذكرات"
                        link="أضف مذكرة"
                        href="add-note"
                        contentView="notes"
                        allLength={teacherStatics?.notesLength}
                        firstLevel={teacherStatics?.firstLevelNotesLength}
                        secondLevel={teacherStatics?.secondLevelNotesLength}
                        thirdLevel={teacherStatics?.thirdLevelNotesLength}
                    />
              </>
            )}

                    
    </div>
  )
}

export default Page