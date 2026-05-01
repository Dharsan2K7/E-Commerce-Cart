const products = [
{ id:1, name:"Headphones", price:1999, img:"https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg"},
{ id:2, name:"Keyboard", price:1499, img:"https://cdn.thewirecutter.com/wp-content/media/2024/11/bluetooth-keyboard-2048px-4346-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024"},
{ id:3, name:"Mouse", price:899, img:"https://cdn.thewirecutter.com/wp-content/media/2025/09/BEST-WIRELESS-MOUSE-9297-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"},
{ id:4, name:"Laptop Bag", price:2299, img:"https://genietravel.com/cdn/shop/files/45-Degree-Angle-2-_28_1200x.jpg?v=1771499569"},
{ id:5, name:"Smart Watch", price:3499, img:"https://www.pebblecart.com/cdn/shop/files/1_2_7d412075-ae0d-4afb-9eef-ddd17573e6a8.jpg?v=1758190819&width=500"},
{ id:6, name:"Speaker", price:2799, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq7fIKmu3VI4cTpEfUtnRq0DduqJRBCBU8_w&s"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart));
}

function showProducts(){
    let html="";
    products.forEach(p=>{
        html+=`
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <div class="price">₹${p.price}</div>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
        `;
    });
    document.getElementById("productList").innerHTML=html;
}

function addToCart(id){
    let item = cart.find(x=>x.id===id);
    if(item){
        item.qty++;
    }else{
        let product = products.find(x=>x.id===id);
        cart.push({...product, qty:1});
    }
    saveCart();
    displayCart();
}

function displayCart(){
    let area=document.getElementById("cartItems");
    let total=0;

    if(cart.length===0){
        area.innerHTML='<div class="empty">Your cart is empty</div>';
        document.getElementById("total").innerText="Total: ₹0";
        return;
    }

    let html="";
    cart.forEach((item,index)=>{
        total += item.price * item.qty;

        html+=`
        <div class="cart-item">
            <b>${item.name}</b><br>
            ₹${item.price}
            <div class="qty-box">
                <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${index},1)">+</button>
            </div>
            <button class="remove" onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    area.innerHTML=html;
    document.getElementById("total").innerText="Total: ₹"+total;
}

function changeQty(index,val){
    cart[index].qty += val;
    if(cart[index].qty<=0) cart.splice(index,1);
    saveCart();
    displayCart();
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
    displayCart();
}

function clearCart(){
    cart=[];
    saveCart();
    displayCart();
}

showProducts();
displayCart();
