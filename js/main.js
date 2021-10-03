'use strict'

{
  const title = document.getElementById('title');
  const genre = document.getElementById('genre');
  const difficulty = document.getElementById('difficulty');
  const question = document.getElementById('question');
  const startBtn = document.getElementById('startbtn');
  const answersArea = document.getElementById('answers');
  const apiUrl = 'https://opentdb.com/api.php?amount=10';

  class Quiz {
    constructor(data) {
      this.quizzes = data.results;
      this.correctAnswersNum = 0;
    }
    getCategory(index) {
      return this.quizzes[index -1].category;
    }
    getDifficulty(index) {
      return this.quizzes[index -1].difficulty;
    }
    getQuestion(index) {
      return this.quizzes[index -1].question;
    }
    getCorrectAnswer(index) {
      return this.quizzes[index -1].correct_answer;
    }
    getIncorrectAnswers(index) {
      return this.quizzes[index -1].incorrect_answers;
    }
    getNumQuizzes() {
      return this.quizzes.length;
    }
    countCorrectAnswers(index, answer) {
      return this.correctAnswersNum++;
    }
  }

  const fetchData = async (index) => {
    title.innerText = '取得中';
    question.innerText = '少々お待ちください';
      const res = await fetch(apiUrl);
      const data = await res.json();
      const quiz = new Quiz(data);
      setNextQuiz(quiz, index);
  }

  const setNextQuiz = (quiz,index) => {
    while (answersArea.firstChild) {
      answersArea.removeChild(answersArea.firstChild);
    }
    if (index <= quiz.getNumQuizzes()) {
      makeQuiz(quiz, index);
    }
  }

  const makeQuiz = (quiz, index) => {
    title.innerText = `問題${index}`;
    genre.innerText = `[ジャンル] ${quiz.getCategory(index)}`;
    difficulty.innerText = `[難易度] ${quiz.getDifficulty(index)}`;
    question.innerText = quiz.getQuestion(index);

    const answers = buildAnswers(quiz, index);

    answers.forEach((answer) => {
      const answerElement = document.createElement('li');
      answersArea.appendChild(answerElement);

      const btnElement = document.createElement('button');
      btnElement.innerText = answer;
      answersArea.appendChild(btnElement);

      btnElement.addEventListener('click', () => {
        quiz.countCorrectAnswers(index, answer);
        index++;
        setNextQuiz(quiz, index);
      });
    });
  }

  const buildAnswers = (quiz, index) => {
    const answers = [
      quiz.getCorrectAnswer(index),
      ...quiz.getIncorrectAnswers(index)
    ];
    return shuffleArray(answers);
  }

  const shuffleArray = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startBtn.addEventListener('click', () => {
    fetchData(1);
    startBtn.style.display = 'none';
  });
}