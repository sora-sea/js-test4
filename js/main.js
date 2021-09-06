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
      const instance = new Quiz(data);
      setNextQuiz(instance, index);
  }

  addBtn.addEventListener('click', () => {

  });
}