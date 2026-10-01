const menuGrid = document.getElementById('menuGrid');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

const fallbackMenu = [
  ['ASOBI Signature Cold Coffee',149,'coffee'],['Caramel Latte',169,'coffee'],['Hazelnut Mocha',189,'coffee'],['Classic Masala Fries',129,'bites'],
  ['Loaded Cheese Fries',179,'bites'],['Crispy Paneer Wrap',199,'bites'],['Chocolate Brownie',139,'dessert'],['Oreo Shake',199,'dessert']
];
function renderMenu(items){menuGrid.innerHTML=items.map((item,i)=>`<article class="menu-item reveal"><span class="num">0${i+1} / ${String(item.category||'').toUpperCase()}</span><h3>${item.name}</h3><p>Freshly prepared, made to order and perfect for your next ASOBI session.</p><span class="price">₹${item.price}</span></article>`).join(''); observeReveals();}
fetch('/api/menu').then(r=>r.json()).then(renderMenu).catch(()=>renderMenu(fallbackMenu.map(x=>({name:x[0],price:x[1],category:x[2]}))));

menuToggle?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20));

const cursorGlow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{cursorGlow.style.left=e.clientX+'px';cursorGlow.style.top=e.clientY+'px';},{passive:true});

function observeReveals(){
  const els=document.querySelectorAll('.reveal:not(.observed)');
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.12});
  els.forEach(el=>{el.classList.add('observed');io.observe(el)});
}
observeReveals();
