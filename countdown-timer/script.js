// Elementos do contador
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minEl = document.getElementById("min");
const secondsEl = document.getElementById("seconds");

// Elementos do modal
const modal = document.getElementById("event-modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.querySelector(".close-btn");
const cancelBtn = document.getElementById("cancel-btn");
const eventNameInput = document.getElementById("event-title");
const eventDateInput = document.getElementById("event-date");
const eventForm = document.getElementById("event-form");
const eventTitle = document.getElementById("event-name");

// Data padrão para o Ano Novo
const defaultEventName = "Ano Novo";
const defaultEventDate = `1 Jan ${new Date().getFullYear() + 1} 00:00:00`;

// Verifica se o valor salvo é válido, se não for volta para o Ano Novo
let eventDate = localStorage.getItem("eventDate");
let eventName = localStorage.getItem("eventName");

// 🔥 Verifica se o valor do localStorage é válido como data
if (!eventDate || isNaN(new Date(eventDate).getTime())) {
    eventDate = defaultEventDate;
    eventName = defaultEventName;
}


eventTitle.innerText = eventName;


openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});


closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    
    eventName = eventNameInput.value;
    eventDate = eventDateInput.value + "T00:00:00"; // Define a hora como 00:00:00

    
    localStorage.setItem("eventName", eventName);
    localStorage.setItem("eventDate", eventDate);

    
    eventTitle.innerText = eventName;

    
    modal.style.display = "none";

    
    countdown();
});

// Função para o contador
function countdown() {
    const targetDate = new Date(eventDate);
    const currentDate = new Date();

    const totalSeconds = (targetDate - currentDate) / 1000;

    if (totalSeconds <= 0) {
        // Quando o tempo acabar, exibe uma mensagem
        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minEl.innerHTML = "00";
        secondsEl.innerHTML = "00";
        eventTitle.innerText = "Event has started!";
        return;
    }

    const days = Math.ceil(totalSeconds / 3600 / 24);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// ✅ Inicializa o contador ao carregar a página
countdown();
setInterval(countdown, 1000);
