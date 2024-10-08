
// leandatatype tss ///

export interface LessonQuiz {
        question: string;
        options: string[];
        correctAnswer: string;
      }
      
      export interface Lesson {
        lessonNumber: string;
        lessonTitle: string;
        quiz: LessonQuiz[];
      }
      
      export interface LearnDataItem {
        _id: string;
        unit: string;
        topic: string;
        totalLessons: string;
        points: string;
        progress: string;
        lessons: Lesson[];
        singleUser:any
      }

      