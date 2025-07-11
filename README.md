# Komunikator – React + Node.js + Socket.IO + WebRTC

Pełny komunikator webowy z logowaniem, czatem tekstowym, rozmowami wideo i głosowymi.

## 🚀 Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Domyślnie działa na `http://localhost:3001`

## ⚙️ Zmienne środowiskowe

Możesz utworzyć plik `.env`:

```
SECRET=twoj_super_tajny_klucz
PORT=3001
```

## 🌐 Wdrożenie na Railway

1. Wrzuć ten folder do GitHuba
2. Połącz repozytorium z Railway
3. Ustaw:
   - Install: `npm install`
   - Start: `npm start`
4. Dodaj w Railway → Variables:
   - `SECRET` = `twoj_klucz`
   - `PORT` = `3001` (opcjonalnie)

## 📁 Struktura

```
backend/
├── public/         # Zbudowany frontend (index.html, js, css)
├── server.js       # Główny serwer Express + Socket.io
├── auth.js         # Endpointy logowania/rejestracji
├── chat.js         # Prosty endpoint testowy
├── package.json    # Skrypty i zależności
└── .gitignore
```#   k o m u n i k a t o r  
 