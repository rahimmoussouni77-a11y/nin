const CuraApp = {
    cart: [],
    cafeData: [
        { id: 1, name: "كابوتشينو ذهبي", price: 550, icon: "☕" },
        { id: 2, name: "موكا باردة", price: 600, icon: "🥤" },
        { id: 3, name: "كرواسون شوكولا", price: 400, icon: "🥐" },
        { id: 4, name: "تشيز كيك نيويورك", price: 750, icon: "🍰" },
        { id: 5, name: "ميلك شيك كورا", price: 650, icon: "🍦" }
    ],
    stickers: ["☕", "❤️", "⭐", "🔥", "🌈", "🍕", "🍔", "📱", "💻", "✨", "🌸", "🌊"],

    init() {
        this.renderCafe();
        this.renderStickers();
        console.log("Cura OS Ready.");
    },

    renderCafe() {
        const grid = document.getElementById('cafe-items-grid');
        grid.innerHTML = this.cafeData.map(item => `
            <div class="cafe-card">
                <div class="icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.price} DA</p>
                <button class="dev-btn" onclick="CuraApp.addToCart('${item.name}', ${item.price})">إضافة للطلب</button>
            </div>
        `).join('');
    },

    renderStickers() {
        const grid = document.getElementById('stickers-gallery');
        grid.innerHTML = this.stickers.map(st => `
            <div class="st-item" onclick="Studio.addSticker('${st}')">${st}</div>
        `).join('');
    },

    addToCart(name, price) {
        this.cart.push({ name, price });
        document.getElementById('cart-qty').innerText = this.cart.length;
        this.updateTotal();
    },

    updateTotal() {
        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('total-val').innerText = total;
    }
};

const Studio = {
    setDevice(type) {
        const board = document.getElementById('drawing-board');
        board.className = `device-${type}`;
    },

    addSticker(icon) {
        const layer = document.getElementById('sticker-layer');
        const div = document.createElement('div');
        div.className = 'drag-element';
        div.innerHTML = icon;
        div.style.fontSize = '40px';
        div.style.left = '50px';
        div.style.top = '50px';
        this.makeDraggable(div);
        div.ondblclick = () => div.remove();
        layer.appendChild(div);
    },

    makeDraggable(el) {
        let x = 0, y = 0, px = 0, py = 0;
        el.onmousedown = (e) => {
            e.preventDefault();
            px = e.clientX; py = e.clientY;
            document.onmousemove = (e) => {
                x = px - e.clientX; y = py - e.clientY;
                px = e.clientX; py = e.clientY;
                el.style.top = (el.offsetTop - y) + "px";
                el.style.left = (el.offsetLeft - x) + "px";
            };
            document.onmouseup = () => { document.onmousemove = null; };
        };
    },

    reset() {
        document.getElementById('sticker-layer').innerHTML = "";
        document.getElementById('print-layer').innerHTML = "";
    },

    confirm() {
        alert("تم حفظ التصميم بنجاح! سيتم إضافته إلى سلتك.");
        CuraApp.addToCart("تصميم مخصص", 1500);
    }
};

const Printer = {
    upload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'drag-element';
            img.style.width = '100px';
            Studio.makeDraggable(img);
            img.ondblclick = () => img.remove();
            document.getElementById('print-layer').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
};

const Router = {
    switch(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`view-${pageId}`).classList.add('active');
        event.currentTarget.classList.add('active');
    }
};

const Payment = {
    select(method) {
        document.querySelectorAll('.method').forEach(m => m.classList.remove('active'));
        document.getElementById(`${method}-method`).classList.add('active');
    },
    process() {
        alert("جاري التحقق من عملية الدفع... شكراً لثقتك بـ CURA!");
    }
};