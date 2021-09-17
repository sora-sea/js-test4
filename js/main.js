'use strict'

{
  const title = document.getElementById('title');
  const genre = document.getElementById('genre');
  const difficulty = document.getElementById('difficulty');
  const question = document.getElementById('question');
  const addBtn = document.getElementById('startbtn');
  const answers = document.getElementById('answers');
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
  }

  const fetchData = async (index) => {
    title.innerText = '取得中';
    question.innerText = '少々お待ちください';
      const res = await fetch(apiUrl);
      const data = await res.json();
      const quiz = new Quiz(data);
      console.log(data);

      
      title.innerText = `問題${index}`;

      const category = quiz.getCategory(index);
      genre.innerText = `[ジャンル] ${category}`;

      const level = quiz.getDifficulty(index);
      difficulty.innerText = `[難易度] ${level}`;

      const query = quiz.getQuestion(index);
      question.innerText = `${query}`;

      const correctAnswer = quiz.getCorrectAnswer(index);
      const answerBtn1 = document.createElement('button');
      answerBtn1.innerText = `${correctAnswer}`;
      answers.appendChild(answerBtn1);

      const incorrectAnswers = quiz.getIncorrectAnswers(index);
      const answerBtn2 = document.createElement('button');
      answerBtn2.innerText = `${incorrectAnswers}`;
      answers.appendChild(answerBtn2);
      const answerBtn3 = document.createElement('button');
      answerBtn3.innerText = `${incorrectAnswers}`;
      answers.appendChild(answerBtn3);
      const answerBtn4 = document.createElement('button');
      answerBtn4.innerText = `${incorrectAnswers}`;
      answers.appendChild(answerBtn4);

      addBtn.style.display = 'none';

      answerBtn1.addEventListener('click', () => {
        for (let i = 2; i < 11; i++) {
          fetchData(i);
        }
      });
      answerBtn2.addEventListener('click', () => {
        for (let i = 2; i < 11; i++) {
          fetchData(i);
        }
      });
      answerBtn3.addEventListener('click', () => {
        for (let i = 2; i < 11; i++) {
          fetchData(i);
        }
      });
      answerBtn4.addEventListener('click', () => {
        for (let i = 2; i < 11; i++) {
          fetchData(i);
        }
      });
  }

  addBtn.addEventListener('click', () => {
    fetchData(1);
  });
}