import { IconType } from "react-icons";

export type LinkMenu = {
  link: string;
  paht: string;
  icon: IconType;
};

export type MenuLinksTypes = LinkMenu[];

export type CardStaticsTypes = {
  title: string;
  subTitle: string;
  allLength: number;
  firstLevel: number;
  secondLevel: number;
  thirdLevel: number;
  link: string;
  href: string;
  contentView: string;
};

export type QuestionTypes = {
  title: string;
  answers: string[];
  correctAnswer: string;
  num: string;
};

export type QuizTypes = {
  questions: QuestionTypes[];
  title: string;
  level: string;
};

export type SubjectTypes = {
  _id: string;
  name: string;
  teachers: TeacherTypes[];
  image: string;
};

export type TeacherTypes = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  about: string;
  isBlocked: boolean;
  subjects: SubjectTypes[];
};

export type NoteType = {
  level: string;
  pdf: string;
  teacher: string;
  title: string;
  _id: string;
};

export type UserTypes = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  notifications: string[];
  level: string;
  isBlocked: boolean;
};

export type LoginDataTypes = {
  email: string;
  password: string;
};

export interface useTeacherInterface {
  teachers: TeacherTypes[] | null;
  isFetchingTeachers: boolean;
  isFetchingTeacher: boolean;
  teacher: TeacherTypes | null;
  teacherStatics: TeacherStatics | null;
  isFetchingTeacherStatics: boolean;

  getTeacherStatics: () => Promise<void>;
  addTeacher: (
    name: string,
    phone: string,
    email: string,
    password: string,
    subId: string,
    avatar: string,
    about: string
  ) => Promise<void>;
}

export type Result = {
  status: boolean;
  message: string;
  error: boolean;
};

export type CombinedType = Result & UserTypes;


export interface useAuthInterface {
  user: UserTypes | null;
  isLogin: boolean;
  isRegister: boolean;
  isChecking: boolean;
  isForgetting: boolean;
  redirectUser: boolean;
  isVerifingCode: boolean;

  userLogin: (email: string, password: string) => Promise<CombinedType>;
  userRegister: (
    name: string,
    email: string,
    password: string,
    level: string,
    phone: string
  ) => Promise<CombinedType>;
  userForgotPassword: (email: string) => Promise<void>;
  userVerifyCode: (email: string, code: number) => Promise<void>;
  setUser: (user: UserTypes | null) => void;
}

export type TeacherStatics = {
  videosLength: number;
  firstLevelVideosLength: number;
  secondLevelVideosLength: number;
  thirdLevelVideosLength: number;
  quizzesLength: number;
  firstLevelQuizzesLength: number;
  secondLevelQuizzesLength: number;
  thirdLevelQuizzesLength: number;
  notesLength: number;
  firstLevelNotesLength: number;
  secondLevelNotesLength: number;
  thirdLevelNotesLength: number;
};

export type Quize = {
  _id: string;
  teacher: string;
  title: string;
  level: string;
  questions: QuestionTypes[];
};

export interface useQuizInterface {
  isFetchingQuize: boolean;
  quizzes: Quize[] | null;

  getQuizzes: (level: string, teacherId: string) => Promise<void>;
}

export type Video = {
  _id: string;
  teacher: string;
  title: string;
  link: string;
  description: string;
  level:  string;
  videoId: string
};

export type CommentType = {
  _id: string;
  user: UserTypes;
  comment: string;
  rate: number;
  show: boolean;
};
