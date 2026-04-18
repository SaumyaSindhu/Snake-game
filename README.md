# 🐍 JS Snake Game

A classic **Snake Game** built using **HTML, SCSS, and JavaScript** — with smooth gameplay, score tracking, and a clean UI.

> Eat food 🍎, grow longer 📈, and don’t crash 💀

---

## 🎮 Features

- 🟢 Smooth snake movement  
- 🍎 Random food generation (never spawns on snake body)  
- 💯 Score tracking  
- 🏆 High score saved using **localStorage**  
- ⏱️ Live timer  
- 💥 Collision detection:
  - Wall collision  
  - Self collision  
- 🔁 Restart game functionality  
- 🎨 Clean UI with SCSS styling  
- 🧠 Smart grid-based rendering system  

---

## 🖥️ Preview

```
Welcome to the Snake Game
[ Start Game ]

Score: 0 | High Score: 0 | Time: 00-00

⬜⬜⬜⬜⬜
⬜🟢⬜🍎⬜
⬜⬜⬜⬜⬜
```

---

## 🛠️ Tech Stack

- **HTML5** – Structure  
- **SCSS (SASS)** – Styling  
- **Vanilla JavaScript** – Game Logic  

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/snake-game.git
   ```

2. Open the project folder  

3. Open `index.html` in your browser  

---

## 🎯 Controls

| Key | Action |
|-----|--------|
| ⬆️ Arrow Up | Move Up |
| ⬇️ Arrow Down | Move Down |
| ⬅️ Arrow Left | Move Left |
| ➡️ Arrow Right | Move Right |

---

## 🧠 How It Works

- The board is divided into a **grid system**
- Each cell is mapped using:
  ```js
  blocks["row-col"]
  ```
- Snake is stored as an array:
  ```js
  let snake = [{ x: 1, y: 3 }];
  ```
- Every frame:
  - New head is calculated  
  - Tail is removed (unless food is eaten)  
  - DOM is updated  

Food generation ensures:
```js
generateFood()
```

Game loop runs using:
```js
setInterval(render, 300)
```

---

## ⚠️ Known Issues

- Reverse direction (180° turn) is allowed  
- Timer format could be improved (00:00 instead of 0-0)  
- No mobile controls yet  
- Game speed is fixed  

---

## 💡 Future Improvements

- 🎮 Add difficulty levels  
- 📱 Add touch controls (mobile support)  
- 🔊 Sound effects  
- 🌈 Themes / dark-light mode  
- ⚡ Increasing speed over time  

---

## 🙌 Credits

Built with ❤️ as a learning project to understand:
- DOM manipulation  
- Game loops  
- State management  
- Grid-based rendering  

---

## ⭐ If You Like This

Give it a ⭐ on GitHub — it motivates a lot!
