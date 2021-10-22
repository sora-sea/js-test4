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
      if (answer === this.getCorrectAnswer(index)) {
        return this.correctAnswersNum++;
      }
    }
    getCorrectAnswersNum() {
      return this.correctAnswersNum;
    }
  }

  const fetchData = async (index) => {
    title.innerText = '取得中';
    question.innerText = '少々お待ちください';
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const quiz = new Quiz(data);
      setNextQuiz(quiz, index);
    } catch(e) {
      console.log(e.message);
    }
  }

  // 10回問題を出しその後結果を出す関数定義
  const setNextQuiz = (quiz, index,) => {
    while (answersArea.firstChild) {
      answersArea.removeChild(answersArea.firstChild);
    }
    if (index <= quiz.getNumQuizzes()) {
      makeQuiz(quiz, index);
    } else {
      finishQuiz(quiz);
    }
  }
  
  // 問題画面の関数定義
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
  
  // 回答ボタンの回答内容を出す関数定義
  const buildAnswers = (quiz, index) => {
    const answers = [
      quiz.getCorrectAnswer(index),
      ...quiz.getIncorrectAnswers(index)
    ];
    return shuffleArray(answers);

  }
  
  // 回答ボタンをランダムにする関数定義
  const shuffleArray = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // 結果画面の関数定義
  const finishQuiz = (quiz) => {
    title.innerText = `あなたの正答数は${quiz.getCorrectAnswersNum()}です！！`;
    question.innerText = '再度チャレンジしたい場合は以下をクリック！！';
    const reloadBtn = document.createElement('button');
    reloadBtn.textContent = 'ホームに戻る';
    answersArea.appendChild(reloadBtn);
    reloadBtn.addEventListener('click', () => {
      location.reload();
    });
  }

  // 開始ボタンを押した時の関数定義
  startBtn.addEventListener('click', () => {
    fetchData(1);
    startBtn.style.display = 'none';
  });
}