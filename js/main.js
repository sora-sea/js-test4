'use strict'

{
  const quizTitle = document.getElementById('quiztitle');
  const quizInfo = document.getElementById('quizinfo');
  const quiz = document.getElementById('quiz');
  const addBtn = document.getElementById('btn');
  const anserList = document.getElementById('anserlist');
  const apiUrl = 'https://opentdb.com/api.php?amount=10';

  addBtn.addEventListener('click', async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
  });
}