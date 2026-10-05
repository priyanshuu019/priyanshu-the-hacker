// ===== MATRIX BACKGROUND =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
let fontSize = 14, drops = [];

function resizeMatrix(){
  canvas.width = innerWidth; canvas.height = innerHeight;
  drops = Array(Math.ceil(canvas.width/fontSize)).fill(1);
}
resizeMatrix();
addEventListener("resize", resizeMatrix);

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]$#@";
function drawMatrix(){
  ctx.fillStyle = "rgba(3,6,5,.075)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#00ff88";
  ctx.font = fontSize + "px monospace";
  drops.forEach((y,i)=>{
    const ch = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(ch,i*fontSize,y*fontSize);
    if(y*fontSize > canvas.height && Math.random() > .975) drops[i]=0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 55);

// ===== BOOT TERMINAL =====
const boot = document.getElementById("bootTerminal");
const lines = [
  ["[BOOT]", "Initializing Priyanshu Cyber Lab..."],
  ["[OK]", "Visual interface loaded."],
  ["[OK]", "Security simulation: ACTIVE."],
  ["[INFO]", "No real systems are accessed."],
  ["[READY]", "Welcome, guest."]
];
let lineIndex = 0;
function bootNext(){
  if(lineIndex >= lines.length){
    boot.innerHTML += '<div><span class="dim">guest@priyanshu:~$</span> <span class="cursor"></span></div>';
    return;
  }
  const [tag,msg] = lines[lineIndex++];
  boot.innerHTML += `<div><span class="dim">${tag}</span> ${msg}</div>`;
  setTimeout(bootNext, 520);
}
bootNext();

// ===== SAFE TERMINAL =====
const form = document.getElementById("commandForm");
const input = document.getElementById("commandInput");
const output = document.getElementById("output");

const commands = {
  help: `<span class="accent">Available commands:</span><br>
         <span class="help">about</span> — identity info<br>
         <span class="help">skills</span> — display toolkit<br>
         <span class="help">status</span> — system status<br>
         <span class="help">clear</span> — clear terminal<br>
         <span class="help">matrix</span> — toggle matrix intensity`,
  about: "PRIYANSHU // THE HACKER — a student-style cyber identity focused on learning and creating.",
  skills: "HTML • CSS • JavaScript • UI Design • Problem Solving",
  status: "SYSTEM: ONLINE<br>SIMULATION: SAFE<br>NETWORK ACCESS: NONE",
  matrix: "Matrix visual intensity toggled."
};

form.addEventListener("submit", e=>{
  e.preventDefault();
  const cmd = input.value.trim().toLowerCase();
  if(!cmd) return;
  output.innerHTML += `<div><span class="prompt">guest@priyanshu:~$</span> ${escapeHtml(cmd)}</div>`;
  if(cmd === "clear"){ output.innerHTML = ""; }
  else if(commands[cmd]) output.innerHTML += `<div>${commands[cmd]}</div>`;
  else output.innerHTML += `<div class="error">Command not found. Type <b>help</b>.</div>`;
  input.value = "";
  output.scrollTop = output.scrollHeight;
});

function escapeHtml(str){
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector(".menu").addEventListener("click", ()=>{
  const nav = document.querySelector(".nav nav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  if(nav.style.display === "flex"){
    nav.style.position="absolute"; nav.style.top="65px"; nav.style.right="6vw";
    nav.style.flexDirection="column"; nav.style.padding="18px";
    nav.style.background="#06100b"; nav.style.border="1px solid rgba(0,255,136,.18)";
  }
});
