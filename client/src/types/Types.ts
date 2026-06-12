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
  courses: [id: string];
};

export type Course = {
  _id: string;
  title: string;
  subject: {
    _id: string;
    name: string;
    teachers: string[]
  };
  image: string;
  price: number;
  offer: number;
  level: string;
  status: string;
  phone: number;
  teacherId?: string
};

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  course: string;
}

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
  parentPhone: string;
  notifications: string[];
  level: string;
  isBlocked: boolean;
  avatar: string
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
    about: string,
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

  userLogin: (email: string, password: string) => Promise<any>;
  userRegister: (
    name: string,
    email: string,
    password: string,
    level: string,
    phone: string,
    parentPhone: string,
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
  subject: {
    _id: string;
    name: string;
  };
  course: {
    _id: string;
    title: string;
  };
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
  level: string;
  videoId: string;
};

export type CommentType = {
  _id: string;
  user: UserTypes;
  comment: string;
  rate: number;
  show: boolean;
};

export interface QuizAnswer {
  questionTitle: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface QuizResultData {
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  answers: QuizAnswer[];
}