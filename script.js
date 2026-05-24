document.addEventListener('DOMContentLoaded', () => {
    // --- МОДАЛЬНОЕ ОКНО ЗАПИСИ ---
    const modal = document.getElementById('booking-modal');
    const bookingBtns = document.querySelectorAll('.open-booking-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('booking-form');

    bookingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        alert(`Спасибо, ${name}! Место забронировано. Мы скоро свяжемся с тобой.`);
        bookingForm.reset();
        closeModal();
    });

    // --- ИНТЕРАКТИВНЫЙ АССИСТЕНТ ---
    const assistantBtn = document.getElementById('assistant-btn');
    const assistantChat = document.getElementById('assistant-chat');
    const closeChatBtn = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatBody = document.getElementById('chat-body');

    assistantBtn.addEventListener('click', () => {
        assistantChat.classList.toggle('hidden');
        if (!assistantChat.classList.contains('hidden')) chatInput.focus();
    });

    closeChatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        assistantChat.classList.add('hidden');
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);
        
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            
            const lower = text.toLowerCase();
            if (lower.includes('привет') || lower.includes('здравствуй')) {
                botMsg.textContent = 'Привет! ✨ Рад видеть тебя. Найти свободное окошко на сегодня?';
            } else if (lower.includes('цена') || lower.includes('сколько') || lower.includes('прайс')) {
                botMsg.textContent = 'Цены у нас доступные: Hair дизайн от 2500₽, Nails от 1900₽. Полный прайс есть чуть выше на странице!';
            } else {
                botMsg.textContent = 'Классный вопрос! Давай мы забронируем тебе время через кнопку «Записаться», и наш администратор всё расскажет подробно?';
            }

            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
    }

    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
});
