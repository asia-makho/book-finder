// 1. Знаходжу всі потрібні елементи на сторінці
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const searchInput = document.getElementById('search-input');

// 2. Головна функція пошуку (спрацьовує при кліку на кнопку)
btn.addEventListener('click', async () => {
    // Отримую те, що ввів користувач (і прибираюю зайві пробіли по краях)
    const query = searchInput.value.trim();

    // Якщо поле пусте — прошу ввести текст та зупиняю функцію
    if (!query) {
        result.textContent = 'Будь ласка, введіть назву книги!';
        return;
    }

    try {
        // Поки чекаю відповіді від сервера, показую текст завантаження
        result.textContent = 'Шукаємо книги... ⏳';

        // Формую правильний запит (замінюю пробіли на плюси)
        const formattedQuery = query.split(' ').join('+');
        const url = `https://openlibrary.org/search.json?q=${formattedQuery}&fields=title,author_name,first_publish_year,cover_i&limit=5`;

        // Роблю запит до API
        const response = await fetch(url);
        if (!response.ok) throw new Error('Помилка запиту: ' + response.status);

        const data = await response.json();
        console.log("Мої сирі дані з сервера:", data);
        // Очищаю текст завантаження
        result.innerHTML = '';

        // Перевіряю, чи існують такі книги
        if (data.docs.length === 0) {
            result.textContent = 'На жаль, за вашим запитом нічого не знайдено 😔';
            return;
        }

        // Проходжусь по знайдених книгах і виводжу їх на екран
        data.docs.forEach(book => {
            const title = book.title;
            const author = book.author_name ? book.author_name[0] : 'Невідомий автор';
            const year = book.first_publish_year ? book.first_publish_year : 'Рік невідомий';
            const coverId = book.cover_i ? book.cover_i : 'Невідомо';

            // Формуюю картинку або текст, якщо її немає
            const coverImg = book.cover_i
                ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg" alt="Обкладинка книги ${title}">`
                : '<p><em>Зображення відсутнє</em></p>';

            // Створюю HTML-картку для книги (з класом book-info для CSS)
            const bookElement = document.createElement('div');
            bookElement.innerHTML = `
                <div>${coverImg}</div>
                <div class="book-info">
                    <h3>📖 ${title}</h3>
                    <p><strong>Автор:</strong> ${author}</p>
                    <p><strong>Рік видання:</strong> ${year}</p>
                    <p><strong>ID обкладинки:</strong> ${coverId}</p>
                </div>
            `;
            result.appendChild(bookElement);
        });

    } catch (err) {
        // Якщо помилка (наприклад, немає інтернету)
        result.textContent = 'Помилка: ' + err.message;
    }
});

// 3. Реакція на клавішу Enter
searchInput.addEventListener('keydown', (event) => {
    // Якщо користувач натиснув Enter у полі вводу...
    if (event.key === 'Enter') {
        btn.click();
    }
});