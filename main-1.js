document.addEventListener("DOMContentLoaded", function () {
  if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
  }
});

function applyPassiveIncome() {
  if (localStorage.getItem("newFeatureButtonClicked") === "true") {
    const lastIncomeTime = parseInt(
      localStorage.getItem("passiveIncomeStarted") || "0"
    );
    const timer = 1000 * 60 * 60;
    const currentTime = Date.now();
    const passedTime = currentTime - lastIncomeTime;
    const updatedTime = Date.now() + timer;

    // Проверяем, было ли начисление
    if (passedTime > 0) {
      const income = 0.00005 * Math.floor(passedTime / 1000); // начисляем каждую секунду
      const currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
      const newBalance = currentBalance + income;
      localStorage.setItem("balance", newBalance.toString());
      localStorage.setItem("passiveIncomeStarted", updatedTime.toString());

      // Запланировать показ алерта через 3 секунды
      setTimeout(() => {
        alert(`🤖 заработал ${income.toFixed(4)} $MELL`);
      }, 3000);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const lastLoadTime = localStorage.getItem("lastLoadTime");
  const currentTime = new Date().getTime();

  // Проверяем, был ли показ экрана загрузки более 30 минут назад
  if (!lastLoadTime || currentTime - lastLoadTime > 1800000) {
    // 1800000 мс = 30 минут
    let loadPercent = 0;
    const interval = setInterval(function () {
      loadPercent += 1;
      document.getElementById(
        "loadingText"
      ).textContent = `Загрузка... ${loadPercent}%`;
      if (loadPercent >= 100) {
        clearInterval(interval);
        document.getElementById("loadingScreen").style.opacity = 0;
        setTimeout(function () {
          document.getElementById("loadingScreen").style.display = "none";
        }, 500); // Плавно скрываем экран загрузки
        // Сохраняем текущее время как время последнего показа экрана загрузки
        localStorage.setItem("lastLoadTime", currentTime.toString());
      }
    }, 20); // Обновляем процент загрузки каждые 40 мс, что дает примерно 4 секунды до 100%
  } else {
    // Если экран загрузки уже показывался в течение последних 30 минут, сразу скрываем его
    document.getElementById("loadingScreen").style.display = "none";
  }
  applyPassiveIncome();
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("imageChanged") === "true") {
    document.querySelector(".centered-image img").src =
      "photo_2024-03-17_19-41-14-removebg-preview.png";
  }

  document
    .querySelector(".centered-container")
    .addEventListener("click", function (event) {
      var image = document.querySelector(".centered-image img");
      image.classList.add("squeeze-animation");
      setTimeout(function () {
        image.classList.remove("squeeze-animation");
      }, 500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  var imageStatus = localStorage.getItem("imageChanged");
  var centeredImage = document.querySelector(".centered-image img");

  if (imageStatus === "true") {
    centeredImage.src = "photo_2024-03-17_19-41-14-removebg-preview.png";
  } else if (imageStatus === "new") {
    centeredImage.src = "dog.png";
  }
});

var canClick = true;
var clickTimeout = 10000;

function setClickTimeout() {
  canClick = false;
  setTimeout(function () {
    canClick = true;
  }, clickTimeout);
}

var storedClickTimeout = localStorage.getItem("clickTimeout");
if (storedClickTimeout !== null) {
  clickTimeout = parseInt(storedClickTimeout);
}

// Функция для анимации увеличения баланса
function animateBalanceIncrement(initial, increment, duration) {
  const balanceElement = document.querySelector(".balance-container p");
  let start = initial;
  let end = initial + increment;
  let startTime = Date.now();

  function update() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;
    if (elapsedTime < duration) {
      let currentBalance = start + increment * (elapsedTime / duration);
      balanceElement.textContent = currentBalance.toFixed(5);
      requestAnimationFrame(update);
    } else {
      balanceElement.textContent = end.toFixed(5);
    }
  }

  update();
}

document
  .querySelector(".centered-image img")
  .addEventListener("click", function () {
    if (canClick) {
      var image = this;
      image.classList.add("shake-image");
      setTimeout(function () {
        image.classList.remove("shake-image");
      }, 500);

      canClick = false;
      var localClickTimeout = localStorage.getItem("clickTimeout");
      setTimeout(
        function () {
          canClick = true;
        },
        localClickTimeout ? parseInt(localClickTimeout) : 10000
      );

      var boostPurchased = localStorage.getItem("boostPurchased");
      var increment = boostPurchased === "true" ? 0.005 : 0.001;
      var currentBalance = parseFloat(
        document.querySelector(".balance-container p").textContent
      );

      animateBalanceIncrement(currentBalance, increment, 5000); // Анимация увеличения баланса

      var progressBarContainer = document.querySelector(
        ".progress-bar-container"
      );
      progressBarContainer.classList.remove("hidden");

      var progressBar = document.querySelector(".progress-bar");
      progressBar.style.animationPlayState = "running";

      progressBar.addEventListener(
        "animationend",
        function () {
          progressBarContainer.classList.add("hidden");
        },
        { once: true }
      );

      localStorage.setItem("balance", (currentBalance + increment).toString());
    }
  });

var balance = localStorage.getItem("balance");
if (balance === null) {
  balance = 0;
} else {
  balance = parseFloat(balance);
}

var balanceElement = document.querySelector(".balance-container p");
balanceElement.textContent = balance.toFixed(5);

document.querySelector(".menu-button").addEventListener("click", function () {
  var balanceElement = document.querySelector(".balance-container p");
  var balance = parseFloat(balanceElement.textContent);
  if (balance >= 0.0) {
    window.location.href = "pay.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var menuButtons = document.querySelectorAll(".menu-button");
  menuButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var targetElement = event.target;
      var isBatteryButton =
        targetElement.classList.contains("image2") ||
        targetElement.closest(".menu-button").classList.contains("image2");
      if (isBatteryButton) {
        window.location.href = "boost.html";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var progressBarContainer = document.querySelector(".progress-bar-container");
  var progressBar = document.querySelector(".progress-bar");
  var animationDuration = localStorage.getItem("animationDuration");
  if (animationDuration !== null) {
    progressBar.style.animationDuration = animationDuration;
  }

  progressBar.addEventListener(
    "animationend",
    function () {
      progressBarContainer.classList.add("hidden");
    },
    { once: true }
  );
});

document
  .querySelector(".menu-button.image3")
  .addEventListener("click", function () {
    window.location.href = "task.html";
  });

document
  .querySelector(".centered-container")
  .addEventListener("click", function (event) {
    var waitMessage = document.getElementById("waitMessage");
    waitMessage.style.display = "block";

    setTimeout(function () {
      waitMessage.style.display = "none";
    }, 5000);
  });

document.addEventListener("DOMContentLoaded", function () {
  var centeredContainer = document.querySelector(".centered-container");
  var imageSources = ["moneypng.webp", "moneypng.webp", "moneypng.webp"];

  centeredContainer.addEventListener("click", function (event) {
    var tapImage = document.createElement("img");
    var currentImage = imageSources.shift();
    imageSources.push(currentImage);
    tapImage.src = currentImage;
    tapImage.classList.add("tap-image");
    tapImage.style.position = "absolute";
    tapImage.style.top = event.clientY + "px";
    tapImage.style.left = event.clientX + "px";

    var randomAngle = Math.random() * 360;
    var randomDistance = Math.random() * 200 + 250;

    tapImage.animate(
      [
        { opacity: 0.5, transform: "translateY(0) rotate(0deg)" },
        {
          opacity: 0,
          transform: `translateY(-${randomDistance}px) rotate(${randomAngle}deg)`,
        },
      ],
      {
        duration: 2000,
        easing: "ease",
        fill: "forwards",
      }
    );

    document.body.appendChild(tapImage);

    setTimeout(function () {
      document.body.removeChild(tapImage);
    }, 2000);
  });
});

document.getElementById("promoBlock").addEventListener("click", function () {
  window.location.href = "https://t.me/mellcoinsapp/489";
});



