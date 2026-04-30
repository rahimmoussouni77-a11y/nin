let cart = [];
const WHATSAPP_NUMBER = "213558773310";

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
    list.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <b>${item.price} DA</b>
            <button onclick="removeItem(${index})" style="background:none;border:none;color:red;cursor:pointer;font-size:16px;">✕</button>
        </div>
    `).join('');
    document.getElementById('total-price').innerText = cart.reduce((a, b) => a + b.price, 0);
}

function removeItem(index) {
    cart.splice(index, 1);
    document.getElementById('count').innerText = cart.length;
    updateCart();
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

    const total = cart.reduce((a, b) => a + b.price, 0);
    const itemsList = cart.map(item => `• ${item.name} - ${item.price} DA`).join('\n');

    const message =
`🛒 *طلب جديد - Créative World*
━━━━━━━━━━━━━━━
${itemsList}
━━━━━━━━━━━━━━━
💰 *المجموع: ${total} DA*
💳 *طريقة الدفع: ${method}*`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    cart = [];
    document.getElementById('count').innerText = 0;
    updateCart();
    toggleCart();
}

function confirmBooking() {
    const name = document.getElementById('res-name').value.trim();
    const time = document.getElementById('res-time').value;
    const phone = document.getElementById('res-phone').value.trim();

    if(!name || !time || !phone) return alert("أكمل جميع البيانات (الاسم، الرقم، والوقت)");

    const dateObj = new Date(time);
    const formattedDate = dateObj.toLocaleDateString('ar-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });

    const message =
`📅 *حجز طاولة جديد - Créative World*
━━━━━━━━━━━━━━━
👤 *الاسم:* ${name}
📞 *رقم الهاتف:* ${phone}
📆 *التاريخ:* ${formattedDate}
🕐 *الوقت:* ${formattedTime}
━━━━━━━━━━━━━━━
يرجى تأكيد الحجز 🙏`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    document.getElementById('res-name').value = '';
    document.getElementById('res-time').value = '';
    document.getElementById('res-phone').value = '';
}

function toggleCart() { document.getElementById('cart').classList.toggle('active'); }

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('preview-container').innerHTML =
            `<img src="${reader.result}" style="width:150px; border-radius:10px; margin-top:10px;">`;
    }
    reader.readAsDataURL(event.target.files[0]);
}