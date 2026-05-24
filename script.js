document.addEventListener('DOMContentLoaded', () => {
    
    // --- МОДАЛЬНОЕ ОКНО ЗАПИСИ ---
    const modal = document.getElementById('booking-modal');
    const bookingBtns = document.querySelectorAll('.open-booking-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('booking-form');

    // Открытие модального окна
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Запрещаем прокрутку фона
        });
    });

    // Закрытие по крестику
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие при клике на темную область вокруг окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Отправка формы записи
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('user-name').value;
        const phone = document.getElementById('user-phone').value;
        const service = document.getElementById('service-select').value;

        // Здесь в будущем будет отправка на сервер
        alert(`Йоу, ${name}! Место забронировано. Мы перезвоним на ${phone}, чтобы подтвердить время.`);
        
        bookingForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });


    // --- ИНТЕРАКТИВНЫЙ АССИСТЕНТ (ЧАТ) ---
    const assistantBtn = document.getElementById('assistant-btn');
    const assistantChat = document.getElementById('assistant-chat');
    const closeChatBtn = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatBody = document.getElementById('chat-body');

    // Переключение видимости чата
    assistantBtn.addEventListener('click', () => {
        assistantChat.classList.toggle('hidden');
        if (!assistantChat.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    // Закрытие чата
    closeChatBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не срабатывал клик по самой кнопке ассистента
        assistantChat.classList.add('hidden');
    });

    // Функция отправки сообщения в чат
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        // Создаем сообщение пользователя
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.textContent = messageText;
        chatBody.appendChild(userMessage);

        // Очищаем инпут и скроллим вниз
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Имитируем задержку ответа «ИИ»
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot');
            
            // Простые триггеры для ответов ассистента
            const lowerText = messageText.toLowerCase();
            if (lowerText.includes('привет') || lowerText.includes('здравствуй')) {
                botMessage.textContent = 'Привет-привет! Рад поболтать. Подсказать свободные окошки на сегодня? Свободно в 14:00 и 18:00.';
            } else if (lowerText.includes('цена') || lowerText.includes('сколько') || lowerText.includes('прайс')) {
                botMessage.textContent = 'У нас всё честно: стрижки от 2000₽, топ-маникюр от 1800₽. Полный прайс чуть выше на странице, или могу записать прямо сейчас!';
            } else if (lowerText.includes('мастер') || lowerText.includes('кто')) {
                botMessage.textContent = 'У нас работают только топ-мастера, которые постоянно на обучении в Москве и Питере. Полные дилетанты к ножницам не подпускаются! 😎';
            } else {
                botMessage.textContent = 'Классный вопрос! Давай я позову администратора в чат или мы сразу забронируем тебе время через кнопку «Записаться» на главном экране?';
            }

            chatBody.appendChild(botMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 800);
    }

    // Отправка по кнопке
    sendChatBtn.addEventListener('click', sendMessage);

    // Отправка по нажатию Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
