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

      const answerBtn1 = document.createElement('button');
      // answerBtn1.innerText = `${correct_answer}`;
      answers.appendChild(answerBtn1);
      const answerBtn2 = document.createElement('button');
      answers.appendChild(answerBtn2);
      const answerBtn3 = document.createElement('button');
      answers.appendChild(answerBtn3);
      const answerBtn4 = document.createElement('button');
      answers.appendChild(answerBtn4);

      addBtn.style.display = 'none';
  }

  addBtn.addEventListener('click', () => {
    fetchData(1);
  });
}