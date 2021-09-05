'use strict'

{
  const title = document.getElementById('title');
  const genre = document.getElementById('genre');
  const difficulty = document.getElementById('difficulty');
  const question = document.getElementById('question');
  const addBtn = document.getElementById('startbtn');
  const answers = document.getElementById('answers');
  const apiUrl = 'https://opentdb.com/api.php?amount=10';

  addBtn.addEventListener('click', async () => {
    title.innerText = '取得中';
    question.innerText = '少々お待ちください';
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
  });
}