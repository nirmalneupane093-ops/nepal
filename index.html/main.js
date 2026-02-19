
let isLoggedIn = false;
let currentUser = '';

// AUTH FUNCTIONS
function showLogin(){
  document.getElementById('loginModal').style.display = 'flex';
  document.getElementById('username').focus();
}

function closeLogin(){
  document.getElementById('loginModal').style.display = 'none';
}

function loginUser(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  
  // Demo credentials
  if((username === 'student' && password === 'unemployed2026') || 
     (username === 'admin' && password === 'admin2026') ||
     (username === 'user' && password === 'user123')){
    
    isLoggedIn = true;
    currentUser = username.charAt(0).toUpperCase() + username.slice(1);
    
    // Update UI
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('userName').textContent = currentUser;
    document.getElementById('lockIcon').style.display = 'none';
    
    // Unlock world data
    unlockWorldData();
    
    closeLogin();
    // Success message
    setTimeout(()=>{
      alert(`✅ Welcome ${currentUser}! Global Data Portal Unlocked! 🚀`);
    },300);
  } else {
    alert('❌ Invalid credentials!\n\nDemo Login:\n👤 student\n🔑 unemployed2026');
    document.getElementById('username').value = 'student';
    document.getElementById('password').value = 'unemployed2026';
  }
}

function logout(){
  isLoggedIn = false;
  currentUser = '';
  document.getElementById('loginBtn').style.display = 'block';
  document.getElementById('userInfo').style.display = 'none';
  document.getElementById('lockIcon').style.display = 'inline';
  lockWorldData();
}

function checkAuthAndShow(pageId){
  if(pageId === 'world'){
    if(isLoggedIn){
      showPage('world');
    } else {
      showLogin();
    }
  } else {
    showPage(pageId);
  }
}

function unlockWorldData(){
  document.getElementById('lockedContent').style.display = 'none';
  document.getElementById('unlockedContent').style.display = 'block';
  if(document.getElementById('world').classList.contains('active')){
    drawCharts();
  }
}

function lockWorldData(){
  document.getElementById('lockedContent').style.display = 'block';
  document.getElementById('unlockedContent').style.display = 'none';
}

/* PARTICLE SYSTEM */
function initParticles(){
  const canvas=document.getElementById('particles');
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  
  const particles=[];
  for(let i=0;i<100;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      vx:Math.random()*0.5-0.25,
      vy:Math.random()*0.5-0.25,
      radius:Math.random()*2+0.5,
      color:['#a64dff','#ff1e1e','#00ffe0'][Math.floor(Math.random()*3)]
    });
  }
  
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>canvas.width)p.vx*=-1;
      if(p.y<0||p.y>canvas.height)p.vy*=-1;
      
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
      ctx.fillStyle=p.color+'40';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* PAGE SWITCH */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id==='world' && isLoggedIn){drawCharts();}
  if(id==='home'){animateCounter();}
}

/* ---------------- WORLD DATA (UNCHANGED) ---------------- */
const countries=[
  {name:"Qatar",pop:0.02,region:"Asia"},
  {name:"Japan",pop:1.8,region:"Asia"},
  {name:"Germany",pop:1.3,region:"Europe"},
  {name:"USA",pop:6.1,region:"North America"},
  {name:"UK",pop:1.3,region:"Europe"},
  {name:"India",pop:30.0,region:"Asia"},
  {name:"Nepal",pop:1.5,region:"Asia"},
  {name:"South Africa",pop:7.0,region:"Africa"},
  {name:"China",pop:10.5,region:"Asia"},
  {name:"Brazil",pop:9.4,region:"South America"},
  {name:"France",pop:2.3,region:"Europe"},
  {name:"Canada",pop:1.2,region:"North America"},
  {name:"Australia",pop:0.7,region:"Oceania"},
  {name:"Indonesia",pop:8.6,region:"Asia"},
  {name:"Mexico",pop:2.2,region:"North America"},
  {name:"Nigeria",pop:5.3,region:"Africa"}
];

function getRating(pop){
  if(pop<1) return "⭐ Low";
  if(pop<5) return "⭐⭐⭐ Medium";
  return "⭐⭐⭐⭐⭐ High";
}

function loadWorldTable(filter="",region=""){
  const table=document.getElementById("countryTable");
  table.innerHTML="";
  countries
    .filter(c=>c.name.toLowerCase().includes(filter.toLowerCase()) && (region===""||c.region===region))
    .sort((a,b)=>a.pop-b.pop)
    .forEach(c=>{
      table.innerHTML+=`<tr><td>${c.name}</td><td><strong>${c.pop.toFixed(1)}</strong></td><td>${c.region}</td><td>${getRating(c.pop)}</td></tr>`;
    });
}

function animateCounter(){
  let target=countries.reduce((sum,c)=>sum+c.pop,0).toFixed(1);
  let count=0;
  let interval=setInterval(()=>{
    count+=0.2;
    document.getElementById("globalCounter").innerText=count.toFixed(1)+" M";
    if(count>=parseFloat(target)) {
      clearInterval(interval);
      document.getElementById("globalCounter").innerText=target+" M";
    }
  },15);
}

const dataSets={
  past:{labels:["2010","2012","2014","2016","2018","2020"],values:[180,175,170,165,160,155]},
  present:{labels:["2021","2022","2023","2024"],values:[152,150,148,147]},
  future:{labels:["2025","2026","2027","2028","2029","2030"],values:[145,143,140,138,135,132]}
};

let barChart, timeChart, pieChart;

function drawBarChart(){/* Same as before */}
function drawPieChart(){/* Same as before */}
function drawTimeChart(set){/* Same as before */}
function changeDataset(set,btn){/* Same as before */}
function drawCharts(){
  const filter=document.getElementById("search").value;
  const region=document.getElementById("regionFilter").value;
  loadWorldTable(filter, region);
  drawBarChart();
  drawPieChart();
  drawTimeChart('past');
}

// Event listeners (same as before)
document.addEventListener('DOMContentLoaded', function(){
  initParticles();
  
  // World Data event listeners (only if unlocked)
  if(document.getElementById("search")){
    document.getElementById("search").addEventListener("input",e=>{
      if(isLoggedIn) loadWorldTable(e.target.value,document.getElementById("regionFilter").value);
    });
    document.getElementById("regionFilter").addEventListener("change",e=>{
      if(isLoggedIn) loadWorldTable(document.getElementById("search").value,e.target.value);
    });
  }
  
  setTimeout(animateCounter,500);
});

// ESC to close modal
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeLogin();
});

