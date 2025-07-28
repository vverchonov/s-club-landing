# Cherry Lips showbar - Нічний Клуб Website

Сучасний, елегантний веб-сайт для нічного клубу, створений з використанням Next.js, React, і Tailwind CSS.

## 🚀 Технології

- **Next.js 15** - React фреймворк з серверним рендерингом
- **React** - JavaScript бібліотека для створення користувацького інтерфейсу
- **Tailwind CSS** - Utility-first CSS фреймворк
- **TypeScript** - Типізована надбудова над JavaScript
- **Framer Motion** - Бібліотека для анімацій
- **MongoDB** - NoSQL база даних
- **Mongoose** - ODM для MongoDB

## ✨ Особливості

- 🎨 Сучасний, респонсивний дизайн
- 📱 Адаптивний під всі пристрої
- 🌙 Темна тема
- 🔄 Плавні анімації та переходи
- 📝 Контактна форма
- 🖼️ Оптимізовані зображення
- 🎯 SEO оптимізація

## 🛠 Встановлення та Запуск

1. **Клонування репозиторію**
   ```bash
   git clone https://github.com/your-username/s-club-landing.git
   cd s-club-landing
   ```

2. **Встановлення залежностей**
   ```bash
   npm install
   # або
   yarn install
   ```

3. **Запуск в режимі розробки**
   ```bash
   npm run dev
   # або
   yarn dev
   ```

4. **Створення production збірки**
   ```bash
   npm run build
   # або
   yarn build
   ```

## 📁 Структура Проекту

```
s-club-landing/
├── app/
│   ├── api/              # API endpoints
│   │   ├── contact/      # Contact form API
│   │   └── tables/       # Tables booking API
│   ├── components/       # React компоненти
│   ├── book/            # Booking page
│   ├── layout.tsx       # Головний layout
│   └── page.tsx         # Головна сторінка
├── lib/                 # Utility functions
│   └── mongodb.ts       # MongoDB connection
├── public/              # Статичні файли
│   ├── gallery/         # Зображення галереї
│   └── logo.png        # Логотип
└── styles/              # Глобальні стилі
```

## 🎯 Компоненти

- **Hero** - Головний банер з основною інформацією
- **Welcome** - Секція з описом клубу
- **Gallery** - Галерея зображень
- **Testimonials** - Відгуки клієнтів
- **Contact** - Контактна форма та інформація
- **Navigation** - Навігаційне меню
- **FadeIn** - Компонент для анімації появи елементів

## 🔧 Налаштування

### MongoDB Configuration

1. Створіть файл `.env.local` в корені проекту
2. Додайте наступну змінну:
   ```
   MONGODB_URI=mongodb://localhost:27017/cherry-lips
   ```
3. Для production використовуйте MongoDB Atlas або ваш MongoDB сервіс:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cherry-lips?retryWrites=true&w=majority
   ```

### Зображення

1. Додайте зображення в папку `public/gallery/`
2. Оновіть шляхи до зображень в компоненті Gallery

### Контактна Форма

1. Налаштуйте обробку форми в компоненті Contact
2. Додайте свій email в конфігурацію

## 📝 Кастомізація

### Кольори
Основні кольори можна змінити в `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      'primary': '#DC2626', // red-600
      'secondary': '#991B1B', // red-800
    }
  }
}
```

### Шрифти
Шрифти можна змінити в `app/layout.tsx`

## 📱 Респонсивність

Сайт адаптований під такі розміри екранів:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Внесок у Проект

Будемо раді вашим пропозиціям щодо покращення проекту. Створюйте issues та pull requests.

## 📄 Ліцензія

MIT License - дивіться [LICENSE.md](LICENSE.md) для деталей.

## 📞 Контакти

Якщо у вас виникли питання, звертайтеся за адресою [your-email@example.com]
