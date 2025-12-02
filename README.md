# 🎭 Буратино AI - Твой AI Ассистент

<div align="center">

![Buratino AI](https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/8f2dc744-2617-4ba8-923d-0ec298c6f12d)

**Дружелюбный AI-ассистент из цифрового леса**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/braslavskii1717/buratino-ai)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🌐 Live Demo](https://buratino-ai.vercel.app) | [📱 Install PWA](https://buratino-ai.vercel.app)

</div>

## ✨ Особенности

- 🎬 **Интерактивное видео-приветствие** с голосовой озвучкой
- 🤖 **Google Gemini 2.0 Flash** - мощный AI под капотом
- 🎤 **Голосовые ответы** - Буратино говорит с вами
- 🎨 **Анимированный аватар** - меняет выражения в зависимости от контекста
- 📱 **PWA Support** - устанавливается как приложение на телефон
- ⚡ **Быстрая загрузка** - оптимизировано для производительности
- 🌍 **Полностью на русском языке**

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Клонируйте репозиторий
git clone https://github.com/braslavskii1717/buratino-ai.git
cd buratino-ai

# Установите зависимости
npm install

# Создайте .env.local файл
cat > .env.local << 'EOL'
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
PERPLEXITY_API_KEY=your_perplexity_key_here
EOL

# Запустите dev сервер
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Деплой на Vercel

1. Нажмите кнопку "Deploy with Vercel" выше
2. Подключите ваш GitHub аккаунт
3. Добавьте Environment Variables:
   - `NEXT_PUBLIC_GEMINI_API_KEY`
   - `PERPLEXITY_API_KEY`
4. Нажмите Deploy!

## 🛠 Технологии

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI**: [Google Gemini AI](https://ai.google.dev/)
- **Voice**: Web Speech API
- **PWA**: next-pwa

## 📱 Установка PWA

### На iPhone/iPad
1. Откройте сайт в Safari
2. Нажмите кнопку "Поделиться"
3. Выберите "На экран «Домой»"

### На Android
1. Откройте сайт в Chrome
2. Нажмите меню (⋮)
3. Выберите "Установить приложение"

## 📁 Структура проекта

```
buratino-ai/
├── app/
│   ├── api/chat/route.ts      # API endpoint для чата
│   ├── layout.tsx             # Корневой layout
│   ├── page.tsx               # Главная страница
│   └── globals.css            # Глобальные стили
├── components/
│   ├── BuratinoAvatar.tsx     # Анимированный аватар
│   ├── ChatInterface.tsx      # Интерфейс чата
│   └── VideoIntro.tsx         # Видео-приветствие
├── lib/
│   └── gemini.ts              # Gemini AI интеграция
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── icon-192.png           # Иконка PWA 192x192
│   └── icon-512.png           # Иконка PWA 512x512
└── next.config.js             # Конфигурация Next.js
```

## 🎨 Персонализация

### Изменить системный промпт

Отредактируйте `lib/gemini.ts`:

```typescript
const BURATINO_SYSTEM_PROMPT = `Ваш кастомный промпт здесь...`;
```

### Изменить изображения

Замените URL в `components/VideoIntro.tsx` и `components/BuratinoAvatar.tsx`.

### Настроить голос

Измените параметры в `components/ChatInterface.tsx`:

```typescript
utterance.rate = 0.9;  // Скорость речи
utterance.pitch = 1.2; // Тональность
```

## 🔑 Environment Variables

Создайте файл `.env.local` в корне проекта:

```env
# Google Gemini API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Perplexity API Key (опционально)
PERPLEXITY_API_KEY=your_perplexity_key_here
```

Получить API ключи:
- [Google AI Studio](https://makersuite.google.com/app/apikey) для Gemini
- [Perplexity](https://www.perplexity.ai/settings/api) для Perplexity

## 📈 Производительность

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~200KB (gzipped)

## 🤝 Контрибуция

Контрибуции приветствуются! Пожалуйста:

1. Fork репозиторий
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. [LICENSE](LICENSE) для деталей.

## 👨‍💻 Автор

**Buratino AI Team**

- GitHub: [@braslavskii1717](https://github.com/braslavskii1717)

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) за отличный фреймворк
- [Google](https://ai.google.dev/) за Gemini AI
- [Vercel](https://vercel.com/) за хостинг
- Все контрибьюторы проекта!

---

<div align="center">

**Сделано с ❤️ и 🪵 деревянным AI**

[⬆ Наверх](#-буратино-ai---твой-ai-ассистент)

</div>
# Force rebuild with new env vars
