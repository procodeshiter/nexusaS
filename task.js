document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".square-block");

  var urls = [
    "https://t.me/ENXcoinn",
    "https://t.me/https://Brutaltrip",
    "https://t.me/Aemulo",
   "https://vt.tiktok.com/ZSYSVFWH4/",
  ];

  buttons.forEach(function (button, index) {
    if (index < 3) { // Условие для первой и второй кнопки
      if (localStorage.getItem("buttonClicked" + index)) {
        markButtonAsCompleted(button);
      } else {
        button.addEventListener("click", function () {
          addToBalanceAndDisplay(index + 1);
          window.location.href = urls[index];
          localStorage.setItem("buttonClicked" + index, "true");
          markButtonAsCompleted(button);
        });
      }
    } else {
      button.addEventListener("click", function () {
        window.location.href = urls[index];
      });
    }
  });
});

function markButtonAsCompleted(button) {
  button.innerHTML = '<div class="completed-text">✅</div>';
  button.classList.add("completed");
  button.disabled = true; // Деактивируем кнопку
}

function addToBalanceAndDisplay(amount) {
    if (amount === 4 || amount === 5) {
        return; // Не добавляем ничего к балансу для третьей и четвёртой кнопок
    }

    var balance = localStorage.getItem('balance');
    if (balance === null) {
        balance = 0;
    } else {
        balance = parseFloat(balance);
    }
    balance += amount;
    localStorage.setItem('balance', balance);
}

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  // Размер и начальная позиция звезды
  const starSize = Math.random() * 3 + 1; // От 1 до 4 пикселей
  star.style.width = `${starSize}px`;
  star.style.height = `${starSize}px`;
  star.style.left = `${Math.random() * window.innerWidth}px`;
  star.style.top = `${Math.random() * window.innerHeight}px`;

  // Случайные конечные координаты и масштаб для анимации
  const xEnd = 1000 * (Math.random() - 0.5); // От -1000 до 1000 пикселей по X
  const yEnd = 1000 * (Math.random() - 0.5); // От -1000 до 1000 пикселей по Y
  const scaleEnd = Math.random() * 1.5 + 0.5; // Масштаб от 0.5 до 2

  // Применяем переменные к анимации
  star.style.setProperty('--x-end', `${xEnd}px`);
  star.style.setProperty('--y-end', `${yEnd}px`);
  star.style.setProperty('--scale-end', scaleEnd);

  // Назначаем анимацию
  star.style.animation = `fly ${Math.random() * 3 + 2}s linear forwards`;

  // Добавляем звезду на страницу и удаляем ее после завершения анимации
  document.body.appendChild(star);
  star.addEventListener('animationend', () => {
    star.remove();
  });
}

// Создаем звезды каждые 100 миллисекунд
setInterval(createStar, 100);



