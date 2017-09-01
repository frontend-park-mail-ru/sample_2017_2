const greeting = document.getElementsByClassName('greeting')[0];

greeting.addEventListener('click', () => {
  greeting.classList.add('hidden');
}, false);
