const CuraApp = {
    cart: [],

    // البيانات الكاملة مع الأسماء والوصف بالفرنسية
    cafeData: [
        { id: 1, name: "Cappuccino", price: 450, img: "cap.jpg", desc: "Café moussé avec crème onctueuse" },
        { id: 2, name: "Gâteau", price: 750, img: "Cake.jpg", desc: "Tranche de gâteau au chocolat noir" },
        { id: 3, name: "Muffins", price: 350, img: "Muffins.jpg", desc: "Muffin moelleux aux pépites" },
        { id: 4, name: "Milkshake", price: 600, img: "Milkshake.jpg", desc: "Boisson lactée fraîche et sucrée" },
        { id: 5, name: "Cheesecake", price: 800, img: "Cheesecake.jpg", desc: "Dessert au fromage frais et fruits" },
        { id: 6, name: "Espresso", price: 500, img: "Espresso.jpg", desc: "Café court et intense" },
        { id: 7, name: "Latte", price: 500, img: "Latte.jpg", desc: "Café au lait doux et velouté" },
        { id: 8, name: "Matcha", price: 500, img: "Matcha.jpg", desc: "Thé vert japonais traditionnel" },
        { id: 9, name: "Mojito", price: 400, img: "Mojito.jpg", desc: "Cocktail rafraîchissant menthe-citron" },
        { id: 10, name: "Smoothie", price: 550, img: "Smoothie.jpg", desc: "Mix de fruits frais naturels" },
        { id: 11, name: "Brownie", price: 300, img: "Brownie.jpg", desc: "Chocolat fondant avec éclats de noix" },
        { id: 12, name: "Bubble Tea", price: 600, img: "Bubble tea.jpg", desc: "Thé aux perles de tapioca" },
        { id: 13, name: "Trompe-l'œil", price: 700, img: "Trompleille.jpg", desc: "Pâtisserie créative spéciale Cura" }
    ],

    init() {
        console.log("Cura App Started...");
        this.renderCafe();
    },

    // عرض المنيو في الصفحة
    renderCafe() {
        const grid = document.getElementById('cafe-items-grid');
        if (!grid) return;

        grid.innerHTML = this.cafeData.map(item => `
            <div class="cafe-card">
                <div class="img-holder">
                    <img src="${item.img}" alt="${item.name}"
                         onerror="this.src='https://via.placeholder.com/300x200?text=Cura+Food'">
                </div>

                <div class="info">
                    <h3>${item.name}</h3>
                    <p class="description">${item.desc}</p>
                    <span class="price-tag">${item.price} DA</span>

                    <button class="pay-btn"
                        onclick="CuraApp.addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
                        Ajouter au Panier
                    </button>
                </div>
            </div>
        `).join('');
    },

    // إضافة منتج للسلة
    addToCart(name, price) {
        this.cart.push({ name, price });
        this.updateUI();
    },

    // تحديث واجهة المستخدم (العداد والمجموع)
    updateUI() {
        // تحديث عداد الأيقونة
        const qty = document.getElementById('cart-qty');
        if (qty) qty.innerText = this.cart.length;

        // تحديث المجموع المالي
        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        const totalEl = document.getElementById('total-val');
        if (totalEl) totalEl.innerText = total;

        // تحديث قائمة المشتريات في الجانب
        const summary = document.getElementById('cart-summary');
        if (summary) {
            summary.innerHTML = this.cart.map((item, index) => `
                <div class="cart-item-row">
                    <span>${item.name}</span>
                    <span class="item-price">${item.price} DA</span>
                </div>
            `).join('');
        }
    }
};

// وظائف إضافية للموقع
const Router = {
    switch(page) {
        console.log("Navigating to: " + page);
        // يمكنك هنا إضافة كود لإخفاء وإظهار الأقسام
    }
};

function toggleCart() {
    const panel = document.getElementById('cart-panel');
    panel.classList.toggle('active');
}
