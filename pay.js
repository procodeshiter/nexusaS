// Получаем последнее сохраненное значение баланса из localStorage
var lastBalance = localStorage.getItem("balance");
if (lastBalance === null) {
  // Если значение не найдено, устанавливаем значение по умолчанию
  lastBalance = 0;
} else {
  // Преобразуем строку в число
  lastBalance = parseFloat(lastBalance);
}

// Получаем элемент .container
var container = document.querySelector(".container");

// Создаем новый элемент для отображения баланса
var balanceDisplay = document.createElement("p");
balanceDisplay.classList.add("balance-display");

// Создаем элемент <img> для изображения
var balanceImage = document.createElement("img");
balanceImage.alt = "Balance Image"; // Добавьте атрибут alt для доступности
balanceImage.classList.add("balance-image"); // Добавляем класс для стилей

// Вставляем изображение внутрь элемента balanceDisplay
balanceDisplay.appendChild(balanceImage);

// Устанавливаем текст для баланса
balanceDisplay.textContent = lastBalance.toFixed(5); // Отображаем баланс

// Вставляем новый элемент перед .container
container.insertAdjacentElement("beforebegin", balanceDisplay);

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

function getTodaysDateFormatted() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Возвращает дату в формате YYYY-MM-DD
}

// Функция для получения прошедшего времени с начальной даты в процентах (для 100 дней)
function getProgressSince(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 100); // Добавляем 100 дней к начальной дате

  const total = end - start;
  const passed = now - start;

  // Рассчитываем процент прошедшего времени от общего периода
  let percent = Math.floor((passed / total) * 100);

  // Убедимся, что процент находится в допустимом диапазоне от 1% до 100%
  percent = Math.max(1, percent); // Не меньше 1%
  percent = Math.min(100, percent); // Не больше 100%

  return percent;
}

function updateProgressBar() {
  const startDate = new Date("2024-03-25").setHours(0, 0, 0, 0); // Задайте начальную дату
  const now = new Date().setHours(0, 0, 0, 0); // Текущая дата с обнулением времени
  const oneDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне

  // Вычисляем разницу в днях
  let daysDiff = Math.round((now - startDate) / oneDay);

  // Прогресс начинается с 0 и не может быть отрицательным
  let progressPercent = daysDiff >= 0 ? daysDiff : 0;

  // Прогресс не может быть больше 100
  progressPercent = progressPercent > 100 ? 100 : progressPercent;

  // Обновляем прогресс-бар
  const progressBar = document.getElementById("dailyProgressBar");
  progressBar.style.width = `${progressPercent}%`;
  // Убираем текстовое содержимое, отображающее проценты
  // progressBar.textContent = `${progressPercent}%`; Эту строку нужно убрать или закомментировать
}

updateProgressBar();

// Вызов функции при загрузке страницы
document.addEventListener("DOMContentLoaded", updateProgressBar);
