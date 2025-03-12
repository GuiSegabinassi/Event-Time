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

// ✅ Data padrão para o Ano Novo
const defaultEventName = "Ano Novo";
const defaultEventDate = `1 Jan ${new Date().getFullYear() + 1} 00:00:00`;

// ✅ Verifica se há valores válidos no localStorage
let eventDate = localStorage.getItem("eventDate");
let eventName = localStorage.getItem("eventName");

// 🔥 Se o valor for inválido ou o evento já passou, volta para o Ano Novo
if (!eventDate || isNaN(new Date(eventDate).getTime()) || new Date(eventDate) < new Date()) {
    console.log("Evento inválido ou já passado. Resetando para o Ano Novo...");
    localStorage.removeItem("eventDate");
    localStorage.removeItem("eventName");

    eventDate = defaultEventDate;
    eventName = defaultEventName;
}

// ✅ Atualiza o título com o nome salvo ou padrão
eventTitle.innerText = eventName;

// ✅ Abre o modal (funciona em celular e desktop)
function openModal() {
    modal.style.display = "flex";
}

openModalBtn.addEventListener("click", openModal);
openModalBtn.addEventListener("touchstart", openModal); // 🔥 Para dispositivos móveis

// ✅ Fecha o modal
function closeModal() {
    modal.style.display = "none";
}

closeModalBtn.addEventListener("click", closeModal);
closeModalBtn.addEventListener("touchstart", closeModal); // 🔥 Para dispositivos móveis

cancelBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("touchstart", closeModal); // 🔥 Para dispositivos móveis

// ✅ Salva o evento ao enviar o formulário
eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Pega o valor do input
    eventName = eventNameInput.value;
    eventDate = eventDateInput.value + "T00:00:00"; // Define a hora como 00:00:00

    // Salva no localStorage
    localStorage.setItem("eventName", eventName);
    localStorage.setItem("eventDate", eventDate);

    // Atualiza o título com o nome do evento
    eventTitle.innerText = eventName;

    // Fecha o modal
    closeModal();

    // Reinicia o contador
    countdown();
});

// ✅ Função para o contador
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

        // 🔥 Remove o evento salvo depois que ele acabar
        localStorage.removeItem("eventDate");
        localStorage.removeItem("eventName");

        setTimeout(() => {
            // 🔥 Retorna para o Ano Novo após 3 segundos
            eventDate = defaultEventDate;
            eventName = defaultEventName;
            eventTitle.innerText = eventName;
            countdown(); // Reinicia o contador
        }, 3000);

        return;
    }

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
}

// ✅ Função para formatar com zero à esquerda
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// ✅ Impede o comportamento padrão de "toque" em dispositivos móveis
document.addEventListener("touchstart", function(event) {
    // Permite o comportamento normal em inputs e campos de seleção
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON' && event.target.tagName !== 'SELECT') {
        event.preventDefault();
    }
}, { passive: false });


// ✅ Inicializa o contador ao carregar a página
countdown();
setInterval(countdown, 1000);
