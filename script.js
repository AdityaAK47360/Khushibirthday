const questions = [
  {
    text: "Ek cheez jo tum Bhagwan se maangti ho?",
    options: [
      "Apni life mein happiness",
      "A good career for my siblings",
      "Duniya ghumne ka mauka",
      "only success for u"
    ],
    correct: 1,
    feedback: "Bilkul sahi! 💛."
  },
  {
    text: "Call pe tumhara sabse zyada use hone wala word kya hai?",
    options: [
      "Yaar suno",
      "Matlab kya hai",
      "Arr suno na",
      "Accha accha okay"
    ],
    correct: 2,
    feedback: "Haha bilkul! 😂!"
  },
  {
    text: "20s mein sabse badi sikhi hui baat?",
    options: [
      "Always hustle harder",
      "Selfish rehna zaroori hai",
      "Never break anyone's heart or try to fool someone",
      "Feelings mat dikhao kabhi"
    ],
    correct: 2,
    feedback: "Exactly! 🌸 ."
  },
  {
    text: "Tumhara daily Instagram screen time kaafi hoga... kitna?",
    options: [
      "1-2 hours ",
      "3-4 hours",
      "5-6 hours",
      "6-7 hours "
    ],
    correct: 3,
    feedback: "🥳"
  },
  {
    text: "Agar Overthinking ka Olympic hota toh Khushi ko kya milta?",
    options: [
      "Silver Medal",
      "Bronze Medal",
      "Gold Medal 🥇",
      "Directly retired ho jaati"
    ],
    correct: 2,
    feedback: "GOLD! 🥇 😂"
  },
  {
    text: "Tumhare camera roll mein sabse zyada konsi pictures hain?",
    options: [
      "Food pics (foodie ho tum)",
      "Selfies 🤳",
      "Aesthetic sky pics",
      "Screenshots"
    ],
    correct: 1,
    feedback: "!"
  },
  {
    text: "Tumhara emotional support kya hai?",
    options: [
      "Music",
      "Food",
      "Sleep 😴",
      "Calling friends"
    ],
    correct: 2,
    feedback: "Neend hi sab kuch hai! 😂 Best emotional support — no drama, just zzz..."
  },
  {
    text: "Instagram pe tumhari favourite reels konsi hoti hain?",
    options: [
      "Travel & aesthetic reels",
      "Comedy & memes",
      "Dr. wali reels 🩺",
      "Fashion & outfit ideas"
    ],
    correct: 2,
    feedback: "Doctor reels! 🌸"
  },
  {
    text: "Mujhse most common question jo tumne pucha ho?",
    options: [
      "Kha liya?",
      "Kya kar rahe ho?",
      "Ye sahi to h na?",
      "Bata kuch"
    ],
    correct: 2,
    feedback: "'Ye sahi to h na?' 😊 💛"
  },
  {
    text: "Main tumhare birthday ke liye sorry kisliye hoon?",
    options: [
      "Cake nahi laaya",
      "Late wish kiya",
      "Tumhare birthday me panda bn ke nhi aa paya 🐼",
      "Gift nahi diya"
    ],
    correct: 2,
    feedback: "Panda costume mein birthday surprise — dream reh gaya! 🐼"
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

function startQuiz() {
  document.getElementById('welcome-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'block';
  renderQuestion();
  spawnPetals();
}

function renderQuestion() {
  const q = questions[currentQ];
  document.getElementById('q-num').textContent = `Question ${String(currentQ+1).padStart(2,'0')}`;
  document.getElementById('q-text').textContent = q.text;
  document.getElementById('q-counter').textContent = `Question ${currentQ+1} of 10`;
  document.getElementById('score-live').textContent = `Score: ${score} ✓`;
  document.getElementById('progress-fill').style.width = `${(currentQ/10)*100}%`;
  document.getElementById('feedback-msg').className = 'feedback-msg';
  document.getElementById('feedback-msg').innerHTML = '';
  document.getElementById('next-btn').className = 'next-btn';
  answered = false;

  const letters = ['A','B','C','D'];
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span>${opt}`;
    btn.onclick = () => selectAnswer(i, btn);
    grid.appendChild(btn);
  });

  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = 'slideUp 0.45s ease';
}

function selectAnswer(idx, btn) {
  if (answered) return;
  answered = true;

  const q = questions[currentQ];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  const fb = document.getElementById('feedback-msg');
  if (idx === q.correct) {
    score++;
    btn.classList.add('correct');
    fb.innerHTML = '✓ ' + q.feedback;
    fb.className = 'feedback-msg correct-fb show';
    burst();
  } else {
    btn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
    fb.innerHTML = '✗ ' + q.feedback;
    fb.className = 'feedback-msg wrong-fb show';
  }

  document.getElementById('score-live').textContent = `Score: ${score} ✓`;
  document.getElementById('next-btn').className = 'next-btn show';
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  document.getElementById('score-display').textContent = score;
  const pct = Math.round((score/10)*100);
  document.getElementById('percent-display').textContent = pct + '%';
  
  let desc = '';
  if (pct === 100) desc = "100%!! Main tujhe usse bhi zyada jaanta hoon jitna tu khud ko jaanti hai! 🏆 Bilkul sahi! Friendship goals!";
  else if (pct >= 80) desc = `${pct}% — Bhai waah! Main tujhe kaafi acchi tarah jaanta hoon! Itni deep friendship hai humari 🌸 Almost perfect!`;
  else if (pct >= 60) desc = `${pct}% — Theek thak jaanta hoon tujhe! Kuch secrets abhi bhi chhupaati hai tu 😄 But acha score hai!`;
  else if (pct >= 40) desc = `${pct}% — Hmm, thodi aur baat karna chahiye tha humein! Ab zyada khuljayenge 😅`;
  else desc = `${pct}% — Lagta hai tu zyada mysterious hai jitna maine socha tha! But dosti toh dil se hai 💖`;
  
  document.getElementById('score-desc').innerHTML = desc;
  launchConfetti();
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#e8a0b4','#d4a843','#c9728e','#f5d0dc','#a04060','#f5e6c4','#ff9ec4'];
  const pieces = Array.from({length:130}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -200,
    w: Math.random()*8+4,
    h: Math.random()*14+6,
    color: colors[Math.floor(Math.random()*colors.length)],
    rot: Math.random()*360,
    rotSpeed: (Math.random()-0.5)*6,
    speed: Math.random()*3+2,
    swing: Math.random()*2-1
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
      p.y += p.speed;
      p.x += Math.sin(frame*0.05)*p.swing;
      p.rot += p.rotSpeed;
      if (p.y > canvas.height+20) {
        p.y = -20;
        p.x = Math.random()*canvas.width;
      }
    });
    frame++;
    if (frame < 240) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

function burst() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#e8a0b4','#d4a843','#c9728e'];
  const particles = Array.from({length:25}, () => ({
    x: canvas.width/2, y: canvas.height/2,
    vx: (Math.random()-0.5)*10,
    vy: (Math.random()-0.5)*10 - 3,
    color: colors[Math.floor(Math.random()*colors.length)],
    life: 1
  }));
  function animate() {
    particles.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI*2);
      ctx.fill();
      p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life -= 0.04;
    });
    ctx.globalAlpha = 1;
    if (particles.some(p => p.life > 0)) requestAnimationFrame(animate);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  animate();
}

function spawnPetals() {
  const colors = ['#e8a0b4','#f5d0dc','#d4a843','#c9728e','#f9e4ec'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random()*100 + 'vw';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDuration = (Math.random()*8+6) + 's';
    p.style.animationDelay = (Math.random()*8) + 's';
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(p);
  }
}

window.addEventListener('load', () => {
  spawnPetals();
});
