const products = [
  {id:1,name:"Heavyweight Core Tee",type:"OVERSIZED / 240 GSM",price:1299,category:"oversized",tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85"},
  {id:2,name:"Earned Not Given Tee",type:"GRAPHIC / OVERSIZED",price:1499,category:"oversized",tag:"NEW DROP",image:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85"},
  {id:3,name:"Aero Training Tee",type:"PERFORMANCE / LIGHTWEIGHT",price:1199,category:"performance",tag:"TRAINING",image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"},
  {id:4,name:"Discipline Dept. Tee",type:"GRAPHIC / RELAXED FIT",price:1399,category:"oversized",tag:"LIMITED",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85"}
];
let cart = JSON.parse(localStorage.getItem("forme-cart") || "[]");
const grid = document.getElementById("productGrid");
const money = n => "₹" + n.toLocaleString("en-IN");
function renderProducts(filter="all"){
  const shown=products.filter(p=>filter==="all"||p.category===filter);
  grid.innerHTML=shown.map(p=>`<article class="product-card">
    <div class="product-visual"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span>
    <button class="quick-add" data-add="${p.id}">ADD TO BAG <span>＋</span></button></div>
    <div class="product-info"><div><div class="product-name">${p.name}</div><div class="product-type">${p.type}</div></div><div class="product-price">${money(p.price)}</div></div>
  </article>`).join("");
}
function save(){localStorage.setItem("forme-cart",JSON.stringify(cart));renderCart()}
function add(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1,size:"L"});save();showToast()}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("drawerCount").textContent=`(${count})`;
  const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  document.getElementById("subtotal").textContent=money(total);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-line"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)} · SIZE ${x.size}</small><div class="qty-controls"><button data-qty="${p.id}" data-change="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-change="1">＋</button></div></div><button class="remove-item" data-remove="${p.id}">REMOVE</button></div>`}).join(""):'<div class="empty-cart">Your bag is taking it easy.<br>Let’s change that. ↗</div>';
}
function showToast(){const t=document.getElementById("toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1500)}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(Number(b.dataset.add))});
document.getElementById("cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]");const r=e.target.closest("[data-remove]");if(q){const x=cart.find(x=>x.id===Number(q.dataset.qty));x.qty+=Number(q.dataset.change);if(x.qty<1)cart=cart.filter(y=>y.id!==x.id);save()}if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));save()}});
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("checkoutBtn").addEventListener("click",()=>alert("This is a demo storefront. Connect a payment provider and checkout flow to accept real orders."));
renderProducts();renderCart();