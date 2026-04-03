import { fetchBooks } from './api.js';
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const searchInput = document.getElementById('search-input');
if (!btn || !result || !searchInput) {
    console.error('Помилка: Не знайдено необхідні DOM-елементи на сторінці!');
}
else {
    btn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (!query) {
            result.textContent = 'Будь ласка, введіть назву книги!';
            return;
        }
        try {
            result.textContent = 'Шукаємо книги... ⏳';
            const data = await fetchBooks(query);
            console.log("Дані з сервера:", data);
            result.innerHTML = '';
            if (data.docs.length === 0) {
                result.textContent = 'На жаль, за вашим запитом нічого не знайдено 😔';
                return;
            }
            data.docs.forEach((book) => {
                const title = book.title;
                const author = book.author_name ? book.author_name[0] : 'Невідомий автор';
                const year = book.first_publish_year ? book.first_publish_year : 'Рік невідомий';
                const coverId = book.cover_i ? book.cover_i : 'Невідомо';
                const coverImg = book.cover_i
                    ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg" alt="Обкладинка книги ${title}">`
                    : '<p><em>Зображення відсутнє</em></p>';
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
        }
        catch (err) {
            if (err instanceof Error) {
                result.textContent = 'Помилка: ' + err.message;
            }
            else {
                result.textContent = 'Сталася невідома помилка';
            }
        }
    });
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            btn.click();
        }
    });
}
