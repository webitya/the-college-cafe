import { week1Quiz } from "./week1/quiz.js"
import { week2Quiz } from "./week2/quiz.js"
import { week3Quiz } from "./week3/quiz.js"
import { week4Quiz } from "./week4/quiz.js"
import { week5Quiz } from "./week5/quiz.js"

export const quizData = {
  week1: week1Quiz,
  week2: week2Quiz,
  week3: week3Quiz,
   week4: week4Quiz,
     week5: week5Quiz,
}

export const getAvailableWeeks = () => {
  return Object.keys(quizData).map((week) => ({
    id: week,
    number: quizData[week].weekNumber,
    title: quizData[week].title,
    description: quizData[week].description,
  }))
}

export const getQuizByWeek = (week) => {
  return quizData[week] || null
}
