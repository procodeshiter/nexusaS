document.addEventListener("DOMContentLoaded", function () {
  // Получаем кнопку улучшения
  checkButtonsStateAndShowNewFeatureButton();
  var boostButton = document.querySelector(".center-block");

  // Проверяем, была ли кнопка уже нажата при предыдущих посещениях страницы
  if (localStorage.getItem("boostButtonClicked") === "true") {
    // Если да, делаем кнопку неактивной и скрываем
    boostButton.classList.add("clicked");
    boostButton.disabled = true;
    boostButton.style.display = "none";
  }

  // Получаем кнопку увеличения скорости
  var speedButton = document.getElementById("speedButton");

  // Проверяем, была ли кнопка уже нажата при предыдущих посещениях страницы
  if (localStorage.getItem("speedButtonClicked") === "true") {
    // Если да, скрываем кнопку
    speedButton.style.display = "none";
  }

  // Обработчик события клика по кнопке увеличения скорости
  speedButton.addEventListener("click", function () {
    // Проверяем, не была ли кнопка уже нажата
    if (!speedButton.disabled) {
      // Получаем текущий баланс из localStorage страницы index.html
      var balance = localStorage.getItem("balance");

      // Проверяем, достаточно ли у пользователя средств для покупки
      if (balance >= 5.0) {
        // Уменьшаем баланс на 5.0
        balance -= 5.0;

        // Обновляем отображение баланса на странице index.html
        localStorage.setItem("balance", balance);

        // Сохраняем новое значение времени анимации в локальное хранилище
        localStorage.setItem("animationDuration", "5s");

        // Сохраняем новое значение времени запрета клика в локальное хранилище
        localStorage.setItem("clickTimeout", "5000");

        // Делаем кнопку неактивной и скрываем
        speedButton.disabled = true;
        speedButton.style.display = "none";

        // Сохраняем информацию о том, что кнопка была нажата
        localStorage.setItem("speedButtonClicked", "true");
        checkButtonsStateAndShowNewFeatureButton();
      } else {
        // Если у пользователя недостаточно средств, выводим сообщение или предпринимаем другие действия
        alert("Недостаточно ENX");
      }
    } else {
      // Если кнопка уже была нажата, выводим сообщение или предпринимаем другие действия
      alert("Улучшение уже было куплено");
    }
  });

  // Обработчик события клика по кнопке "Get free coins"
  var profitButton = document.getElementById("profitButton");
  var lastClickTime = localStorage.getItem("lastClickTime");
  if (lastClickTime !== null) {
    var timeElapsed = Date.now() - lastClickTime;
    if (timeElapsed < 10800000) {
      // Если прошло меньше 3 часов с момента последнего клика, блокируем кнопку
      profitButton.disabled = true;
      profitButton.style.backgroundColor = "rgba(128, 128, 128, 0.1)";
      var countdown = Math.ceil((10800000 - timeElapsed) / 1000); // переводим миллисекунды в секунды
      var hours = Math.floor(countdown / 3600);
      var minutes = Math.floor((countdown % 3600) / 60);
      var seconds = countdown % 60;
      profitButton.textContent =
        "Осталось " + hours + " часов " + minutes + " минут";
      var intervalId = setInterval(function () {
        countdown--;
        hours = Math.floor(countdown / 3600);
        minutes = Math.floor((countdown % 3600) / 60);
        seconds = countdown % 60;
        if (countdown > 3600) {
          profitButton.textContent =
            "Осталось " + hours + " ч " + minutes + " мин ⏳";
        } else if (countdown > 60) {
          profitButton.textContent =
            "Осталось " + minutes + " минут " + seconds + " секунд ⏳";
        } else if (countdown > 0) {
          profitButton.textContent = "Осталось " + seconds + " секунд ⏳";
        } else {
          clearInterval(intervalId);
          profitButton.disabled = false;
          profitButton.style.backgroundColor = "";
          profitButton.textContent = "🎁 Get free coins";
        }
      }, 1000); // обновляем каждую секунду
    }
  }
  profitButton.addEventListener("click", function () {
    // Проверяем, не была ли кнопка уже нажата
    if (!profitButton.disabled) {
      // Получаем текущий баланс из localStorage страницы index.html
      var balance = localStorage.getItem("balance");

      // Если баланс еще не установлен, устанавливаем его в 0
      if (balance === null) {
        balance = 0;
      } else {
        // Преобразуем строку в число
        balance = parseFloat(balance);
      }

      // Увеличиваем баланс на 0.50
      balance += 0.5;

      // Обновляем отображение баланса на странице index.html
      localStorage.setItem("balance", balance);

      // Делаем кнопку неактивной и скрываем
      profitButton.disabled = true;
      profitButton.style.backgroundColor = "grey";

      // Запускаем таймер обратного отсчета
      var countdown = 180 * 60; // Время в секундах
      var intervalId = setInterval(function () {
        countdown--;
        hours = Math.floor(countdown / 3600);
        minutes = Math.floor((countdown % 3600) / 60);
        seconds = countdown % 60;
        if (countdown > 3600) {
          profitButton.textContent =
            "Подождите " + hours + " часов " + minutes + " минуты";
        } else if (countdown > 60) {
          profitButton.textContent =
            "Подождите " + minutes + " минут " + seconds + " секунд";
        } else if (countdown > 0) {
          profitButton.textContent = "Подождите " + seconds + " секунд";
        } else {
          // Время вышло
          clearInterval(intervalId);
          // Возвращаем кнопке нормальный вид
          profitButton.disabled = false;
          profitButton.style.backgroundColor = "";
          profitButton.textContent = "🎁 Get free coins";
        }
      }, 1000); // обновляем каждую секунду

      // Сохраняем время клика
      localStorage.setItem("lastClickTime", Date.now());
    }
  });

  // Получаем кнопку увеличения монет
  var coinsButton = document.getElementById("coinsButton");

  // Проверяем, была ли кнопка уже нажата при предыдущих посещениях страницы
  if (localStorage.getItem("coinsButtonClicked") === "true") {
    // Если да, скрываем кнопку
    coinsButton.style.display = "none";
  }

  // Обработчик события клика по кнопке увеличения монет
  coinsButton.addEventListener("click", function () {
    // Получаем текущий баланс из localStorage страницы index.html
    var balance = localStorage.getItem("balance");

    // Проверяем, достаточно ли у пользователя средств для покупки
    if (balance >= 10.0) {
      balance -= 10.0;
      localStorage.setItem("balance", balance.toString());
      // Делаем кнопку неактивной и скрываем
      coinsButton.disabled = true;
      coinsButton.style.display = "none";

      // Сохраняем информацию о том, что кнопка была нажата
      localStorage.setItem("coinsButtonClicked", "true");
      localStorage.setItem("boostPurchased", "true");

      checkButtonsStateAndShowNewFeatureButton();
    } else {
      // Если у пользователя недостаточно средств, выводим сообщение или предпринимаем другие действия
      alert("Недостаточно ENX");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Получаем кнопку увеличения монет
  var coinsButton = document.getElementById("coinsButton");

  // Обработчик события клика по кнопке увеличения монет
  coinsButton.addEventListener("click", function () {
    // Переход на страницу index.html
    window.location.href = "index.html";
  });

  // Получаем кнопку увеличения скорости
  var speedButton = document.getElementById("speedButton");

  // Обработчик события клика по кнопке увеличения скорости
  speedButton.addEventListener("click", function () {
    // Переход на страницу index.html
    window.location.href = "index.html";
  });

  // Получаем кнопку получения прибыли
  var profitButton = document.getElementById("profitButton");

  // Обработчик события клика по кнопке получения прибыли
  profitButton.addEventListener("click", function () {
    // Переход на страницу index.html
    window.location.href = "index.html";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var imageChangeButton = document.getElementById("imageChangeButton");

  if (localStorage.getItem("imageChangeButtonClicked") === "true") {
    // Если кнопка уже нажата и скин куплен, делаем кнопку неактивной
    imageChangeButton.disabled = true;
    imageChangeButton.classList.add("clicked");
    // Добавляем текст "Куплено" на кнопку
    imageChangeButton.innerHTML += "<p>&nbsp;✓</p>";
  } else {
    imageChangeButton.addEventListener("click", function () {
      var balance = parseFloat(localStorage.getItem("balance"));

      if (balance >= 10.0) {
        balance -= 10.0;
        localStorage.setItem("balance", balance.toString());
        localStorage.setItem("imageChanged", "true");
        localStorage.setItem("imageChangeButtonClicked", "true");

        // Делаем кнопку неактивной
        imageChangeButton.disabled = true;
        imageChangeButton.classList.add("clicked");
        // Добавляем текст "Куплено" на кнопку
        imageChangeButton.innerHTML += "<p></p>";

        // Перенаправляем пользователя на страницу index.html
        window.location.href = "index.html";
      } else {
        alert("Недостаточно ENX");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var newImageChangeButton = document.getElementById("newImageChangeButton");

  if (localStorage.getItem("newImageChangeButtonClicked") === "true") {
    // Если кнопка уже нажата и скин куплен, делаем кнопку неактивной
    newImageChangeButton.disabled = true;
    newImageChangeButton.classList.add("clicked");
    // Добавляем текст "Куплено" на кнопку
    newImageChangeButton.innerHTML += "<p>&nbsp;✓</p>";
  } else {
    newImageChangeButton.addEventListener("click", function () {
      var balance = parseFloat(localStorage.getItem("balance"));

      if (balance >= 25.0) {
        balance -= 25.0;
        localStorage.setItem("balance", balance.toString());
        localStorage.setItem("imageChanged", "new");
        localStorage.setItem("newImageChangeButtonClicked", "true");

        // Делаем кнопку неактивной
        newImageChangeButton.disabled = true;
        newImageChangeButton.classList.add("clicked");
        // Добавляем текст "Куплено" на кнопку
        newImageChangeButton.innerHTML += "<p></p>";

        // Перенаправляем пользователя на страницу index.html
        window.location.href = "index.html";
      } else {
        alert("Недостаточно ENX");
      }
    });
  }
});

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

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
  star.style.setProperty("--x-end", `${xEnd}px`);
  star.style.setProperty("--y-end", `${yEnd}px`);
  star.style.setProperty("--scale-end", scaleEnd);

  // Назначаем анимацию
  star.style.animation = `fly ${Math.random() * 3 + 2}s linear forwards`;

  // Добавляем звезду на страницу и удаляем ее после завершения анимации
  document.body.appendChild(star);
  star.addEventListener("animationend", () => {
    star.remove();
  });
}

// Создаем звезды каждые 100 миллисекунд
setInterval(createStar, 100);

function checkButtonsStateAndShowNewFeatureButton() {
  var coinsButtonClicked =
    localStorage.getItem("coinsButtonClicked") === "true";
  var speedButtonClicked =
    localStorage.getItem("speedButtonClicked") === "true";

  // Если обе кнопки были нажаты, показываем `newFeatureButton`
  if (coinsButtonClicked && speedButtonClicked) {
    var newFeatureButton = document.getElementById("newFeatureButton");
    newFeatureButton.style.display = "block";
    // Сохраняем состояние показа `newFeatureButton` в localStorage
    localStorage.setItem("newFeatureButtonShown", "true");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var newFeatureButton = document.getElementById("newFeatureButton");

  // Восстановление состояния кнопки
  if (localStorage.getItem("newFeatureButtonClicked") === "true") {
    newFeatureButton.textContent = "On 🟢";
    newFeatureButton.disabled = true;
  }

  newFeatureButton.addEventListener("click", function () {
    var balance = parseFloat(localStorage.getItem("balance")) || 0;

    if (balance < 20) {
      alert("Недостаточно средств");
    } else {
      balance -= 20;
      localStorage.setItem("balance", balance.toString());
      localStorage.setItem("newFeatureButtonClicked", "true");
      newFeatureButton.textContent = "On 🟢";
      newFeatureButton.disabled = true;

      // Начать начисление
      const timers = Date.now() + 600000;
      localStorage.setItem("passiveIncomeStarted", timers.toString());
    }
  });
});
