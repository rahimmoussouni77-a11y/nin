let cart = [];

function openTab(tabId) {
    const contents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
        contents[i].classList.remove('active');
    }

    const buttons = document.getElementsByClassName('nav-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    document.getElementById(tabId).style.display = 'block';
    document.getElementById(tabId).classList.add('active');

    // تفعيل الزر المناسب
    if(tabId === 'cafe') document.getElementById('btn-cafe').classList.add('active');
    if(tabId === 'studio') document.getElementById('btn-studio').classList.add('active');
    if(tabId === 'booking') document.getElementById('btn-booking').classList.add('active');
}

function showStudioSection(sectionId) {
    document.getElementById('ready-designs').style.display = (sectionId === 'ready-designs') ? 'grid' : 'none';
    document.getElementById('custom-upload').style.display = (sectionId === 'custom-upload') ? 'block' : 'none';
}

function addItem(name, price) {
    cart.push({ name, price });
    document.getElementById('count').innerText = cart.length;
    updateCart();
}

function updateCart() {
    const list = document.getElementById('cart-list');
    list.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <b>${item.price} DA</b>
        </div>
    `).join('');
    document.getElementById('total-price').innerText = cart.reduce((a, b) => a + b.price, 0);
}

function clearCart() {
    if(confirm("هل تريد إفراغ السلة؟")) {
        cart = [];
        document.getElementById('count').innerText = 0;
        updateCart();
        toggleCart();
    }
}

function checkout(method) {
    if(cart.length === 0) return alert("السلة فارغة!");
    alert("تم الطلب بنجاح عبر " + method);
    cart = [];
    document.getElementById('count').innerText = 0;
    updateCart();
    toggleCart();
}

function confirmBooking() {
    const name = document.getElementById('res-name').value;
    const time = document.getElementById('res-time').value;
    if(!name || !time) return alert("أكمل البيانات");
    alert("تم حجز طاولة لـ " + name + " في " + time);
}

function toggleCart() { document.getElementById('cart').classList.toggle('active'); }

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('preview-container').innerHTML = `<img src="${reader.result}" style="width:150px; border-radius:10px; margin-top:10px;">`;
    }
    reader.readAsDataURL(event.target.files[0]);
}
