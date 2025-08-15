export const courses = [
  {
    id: "foundation-7",
    name: "Foundation English",
    level: "Beginner",
    duration: 7,
    description: "Master English basics in just one week with essential vocabulary and grammar fundamentals.",
    features: ["Basic Grammar", "Essential Vocabulary", "Simple Conversations", "Pronunciation Guide"],
    progress: 0,
  },
  {
    id: "essential-21",
    name: "Essential English",
    level: "Intermediate",
    duration: 21,
    description: "Build strong English foundations with comprehensive grammar, vocabulary, and communication skills.",
    features: ["Grammar Mastery", "Expanded Vocabulary", "Reading Comprehension", "Writing Skills"],
    progress: 0,
  },
  {
    id: "advanced-30",
    name: "Advanced English",
    level: "Advanced",
    duration: 30,
    description: "Achieve fluency with advanced grammar, professional vocabulary, and complex communication patterns.",
    features: ["Advanced Grammar", "Professional Vocabulary", "Business English", "Academic Writing"],
    progress: 0,
  },
  {
    id: "master-90",
    name: "Master English",
    level: "Expert",
    duration: 90,
    description:
      "Achieve native-level proficiency with advanced literature, professional communication, and cultural nuances.",
    features: ["Native Fluency", "Literature Analysis", "Cultural Context", "Professional Mastery"],
    progress: 0,
  },
]

export const getCourseById = (courseId) => {
  return courses.find((course) => course.id === courseId)
}

export const getLessonByDay = async (courseId, day) => {
  const course = getCourseById(courseId)
  if (!course) return null

  try {
    const folderMap = {
      "foundation-7": "7-days",
      "essential-21": "21-days",
      "advanced-30": "30-days",
      "master-90": "90-days",
    }

    const folderName = folderMap[courseId]
    const lessonModule = await import(`../data/courses/${folderName}/day-${day}.js`)
    return lessonModule.lesson
  } catch (error) {
    console.log(`[v0] Lesson not found for ${courseId} day ${day}, generating default`)
    return generateDefaultLesson(courseId, day)
  }
}

const generateDefaultLesson = (courseId, day) => {
  const course = getCourseById(courseId)
  if (!course) return null

  return {
    day,
    title: `${course.level} English - Day ${day}`,
    syllabus: ["Grammar concepts", "Vocabulary building", "Practice exercises", "Speaking activities"],
    todaysWords: [
      { word: "Example", meaning: "A sample or instance", example: "This is an example sentence." },
      { word: "Practice", meaning: "To do repeatedly to improve", example: "Practice makes perfect." },
      { word: "Learn", meaning: "To gain knowledge", example: "I want to learn English." },
      { word: "Study", meaning: "To examine closely", example: "I study every day." },
      { word: "Improve", meaning: "To make better", example: "I want to improve my English." },
    ],
    practiceQuestions: [
      {
        question: `Sample question for day ${day}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
      },
    ],
    videoUrl: `https://youtube.com/watch?v=example${day}`,
    resourcePdf: `/resources/${courseId}/day${day}.pdf`,
  }
}

export const generateLessonsForCourse = async (courseId) => {
  const course = getCourseById(courseId)
  if (!course) return []

  const lessons = []
  for (let day = 1; day <= course.duration; day++) {
    try {
      const lesson = await getLessonByDay(courseId, day)
      lessons.push(lesson)
    } catch (error) {
      lessons.push(generateDefaultLesson(courseId, day))
    }
  }
  return lessons
}
