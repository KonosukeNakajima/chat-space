// ===== GiftBox アプリケーション =====
const app = {
  cart: [],
  history: [],
  currentCategory: 'all',
  currentGiftId: null,

  // おすすめギフトID（手動セレクション）
  recommendedIds: [1, 5, 9, 13, 17, 7],
  // 人気ランキングID
  rankingIds: [13, 1, 10, 6, 17],

  // シーン別マッピング
  sceneMap: {
    birthday: [1, 2, 6, 13, 17],
    thankyou: [4, 7, 9, 10, 12],
    celebration: [5, 6, 13, 16, 18],
    relax: [9, 12, 13, 3, 7],
    season: [2, 3, 7, 8, 19],
    luxury: [13, 16, 17, 18, 15]
  },

  // 初期化
  init() {
    this.loadFromStorage();
    this.renderHome();
    this.renderHistory();
    this.updateCartBadge();
    this.setupEventListeners();
  },

  // イベントリスナー設定
  setupEventListeners() {
    // ナビゲーション
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page) this.showPage(page);
      });
    });

    // カテゴリフィルター
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterByCategory(btn.dataset.category);
      });
    });

    // モーダル外クリックで閉じる
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeModal();
    });

    document.getElementById('video-modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeVideoModal();
    });

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeVideoModal();
      }
    });
  },

  // ===== ホームページ描画 =====
  renderHome() {
    this.renderRecommended();
    this.renderRanking();
    this.renderNewGifts();
  },

  // おすすめギフト
  renderRecommended() {
    const container = document.getElementById('recommended-gifts');
    const gifts = this.recommendedIds
      .map(id => GIFTS.find(g => g.id === id))
      .filter(Boolean);

    container.innerHTML = gifts.map(gift => `
      <div class="gift-scroll-card" onclick="app.openModal(${gift.id})">
        <div class="gift-scroll-card-image">${gift.emoji}</div>
        <div class="gift-scroll-card-body">
          <div class="gift-scroll-card-name">${gift.name}</div>
          <div class="gift-scroll-card-price">&yen;${gift.price.toLocaleString()}</div>
        </div>
      </div>
    `).join('');
  },

  // 人気ランキング
  renderRanking() {
    const container = document.getElementById('ranking-gifts');
    const gifts = this.rankingIds
      .map(id => GIFTS.find(g => g.id === id))
      .filter(Boolean);

    container.innerHTML = gifts.map((gift, index) => {
      const rankClass = index < 3 ? `rank-${index + 1}` : 'rank-other';
      return `
        <div class="ranking-item" onclick="app.openModal(${gift.id})">
          <div class="ranking-badge ${rankClass}">${index + 1}</div>
          <span class="ranking-emoji">${gift.emoji}</span>
          <div class="ranking-info">
            <div class="ranking-name">${gift.name}</div>
            <div class="ranking-category">${gift.categoryLabel}</div>
          </div>
          <div class="ranking-price">&yen;${gift.price.toLocaleString()}</div>
        </div>
      `;
    }).join('');
  },

  // 新着ギフト（最後の6つ）
  renderNewGifts() {
    const container = document.getElementById('new-gifts');
    const gifts = GIFTS.slice(-6).reverse();

    container.innerHTML = gifts.map(gift => `
      <div class="gift-card" onclick="app.openModal(${gift.id})">
        <div class="gift-card-image">${gift.emoji}</div>
        <div class="gift-card-body">
          <div class="gift-card-category">${gift.categoryLabel}</div>
          <h3 class="gift-card-name">${gift.name}</h3>
          <p class="gift-card-description">${gift.description}</p>
          <div class="gift-card-footer">
            <span class="gift-card-price">&yen;${gift.price.toLocaleString()}</span>
            <button class="btn-add-cart" onclick="event.stopPropagation(); app.addToCart(${gift.id}, this)">
              追加
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  // ===== ページ切り替え =====
  showPage(pageName) {
    // ページの表示切り替え
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(`page-${pageName}`);
    if (page) page.classList.add('active');

    // ナビのアクティブ状態
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageName);
    });

    // ページ別処理
    if (pageName === 'cart') this.renderCart();
    if (pageName === 'history') this.renderHistory();
    if (pageName === 'categories') this.showCategoryList();

    // スクロールトップ
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ===== カテゴリ選択 =====
  showCategoryList() {
    const richCats = document.getElementById('rich-categories');
    const filter = document.getElementById('category-filter');
    const grid = document.getElementById('gift-grid');
    const backBtn = document.getElementById('back-to-categories');

    richCats.style.display = 'grid';
    filter.style.display = 'none';
    grid.style.display = 'none';
    backBtn.style.display = 'none';
  },

  selectCategory(category) {
    this.currentCategory = category;
    const richCats = document.getElementById('rich-categories');
    const filter = document.getElementById('category-filter');
    const grid = document.getElementById('gift-grid');
    const backBtn = document.getElementById('back-to-categories');

    richCats.style.display = 'none';
    filter.style.display = 'flex';
    grid.style.display = 'grid';
    backBtn.style.display = 'block';

    // フィルターのアクティブ状態を更新
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    this.renderGifts();
  },

  // ホームのクイックカテゴリからカテゴリページへ飛ぶ
  filterAndShowCategory(category) {
    this.showPage('categories');
    // 少し遅延させてページ表示後にカテゴリ選択
    setTimeout(() => this.selectCategory(category), 50);
  },

  // シーン別フィルター
  filterByScene(scene) {
    const ids = this.sceneMap[scene] || [];
    this.showPage('categories');
    setTimeout(() => {
      const richCats = document.getElementById('rich-categories');
      const filter = document.getElementById('category-filter');
      const grid = document.getElementById('gift-grid');
      const backBtn = document.getElementById('back-to-categories');

      richCats.style.display = 'none';
      filter.style.display = 'none';
      grid.style.display = 'grid';
      backBtn.style.display = 'block';

      const gifts = ids.map(id => GIFTS.find(g => g.id === id)).filter(Boolean);
      grid.innerHTML = gifts.map(gift => this.renderGiftCard(gift)).join('');
    }, 50);
  },

  // ===== ギフト一覧描画 =====
  renderGifts() {
    const grid = document.getElementById('gift-grid');
    const filtered = this.currentCategory === 'all'
      ? GIFTS
      : GIFTS.filter(g => g.category === this.currentCategory);

    grid.innerHTML = filtered.map(gift => this.renderGiftCard(gift)).join('');
  },

  renderGiftCard(gift) {
    return `
      <div class="gift-card" onclick="app.openModal(${gift.id})">
        <div class="gift-card-image">${gift.emoji}</div>
        <div class="gift-card-body">
          <div class="gift-card-category">${gift.categoryLabel}</div>
          <h3 class="gift-card-name">${gift.name}</h3>
          <p class="gift-card-description">${gift.description}</p>
          <div class="gift-card-footer">
            <span class="gift-card-price">&yen;${gift.price.toLocaleString()}</span>
            <button class="btn-add-cart" onclick="event.stopPropagation(); app.addToCart(${gift.id}, this)">
              追加
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ===== カテゴリフィルター =====
  filterByCategory(category) {
    this.currentCategory = category;

    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    this.renderGifts();
  },

  // ===== モーダル =====
  openModal(giftId) {
    const gift = GIFTS.find(g => g.id === giftId);
    if (!gift) return;

    this.currentGiftId = giftId;

    document.getElementById('modal-image').textContent = gift.emoji;
    document.getElementById('modal-category').textContent = gift.categoryLabel;
    document.getElementById('modal-name').textContent = gift.name;
    document.getElementById('modal-description').textContent = gift.description;
    document.getElementById('modal-price').textContent = `\u00a5${gift.price.toLocaleString()}`;

    const addBtn = document.getElementById('modal-add-btn');
    const inCart = this.cart.some(item => item.id === giftId);
    addBtn.textContent = inCart ? 'カートに追加済み' : 'カートに追加';

    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
    this.currentGiftId = null;
  },

  addToCartFromModal() {
    if (this.currentGiftId) {
      this.addToCart(this.currentGiftId);
      const addBtn = document.getElementById('modal-add-btn');
      addBtn.textContent = 'カートに追加済み';
    }
  },

  // ===== 動画モーダル =====
  playVideo(cardEl) {
    document.getElementById('video-modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeVideoModal() {
    document.getElementById('video-modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  },

  // ===== カート機能 =====
  addToCart(giftId, buttonEl) {
    const gift = GIFTS.find(g => g.id === giftId);
    if (!gift) return;

    const existing = this.cart.find(item => item.id === giftId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...gift, qty: 1 });
    }

    this.saveToStorage();
    this.updateCartBadge();
    this.showToast(`${gift.name} をカートに追加しました`);

    // ボタンのフィードバック
    if (buttonEl) {
      buttonEl.textContent = '追加済';
      buttonEl.classList.add('added');
      setTimeout(() => {
        buttonEl.textContent = '追加';
        buttonEl.classList.remove('added');
      }, 1500);
    }
  },

  removeFromCart(giftId) {
    this.cart = this.cart.filter(item => item.id !== giftId);
    this.saveToStorage();
    this.updateCartBadge();
    this.renderCart();
  },

  updateQty(giftId, delta) {
    const item = this.cart.find(i => i.id === giftId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.removeFromCart(giftId);
      return;
    }

    this.saveToStorage();
    this.updateCartBadge();
    this.renderCart();
  },

  updateCartBadge() {
    const total = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-badge');
    badge.textContent = total;
    badge.dataset.count = total;
    badge.style.display = total > 0 ? 'inline' : 'none';
  },

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const emptyEl = document.getElementById('cart-empty');
    const summaryEl = document.getElementById('cart-summary');

    if (this.cart.length === 0) {
      itemsContainer.style.display = 'none';
      summaryEl.style.display = 'none';
      emptyEl.style.display = 'block';
      return;
    }

    emptyEl.style.display = 'none';
    itemsContainer.style.display = 'flex';
    summaryEl.style.display = 'block';

    itemsContainer.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">&yen;${item.price.toLocaleString()}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="app.updateQty(${item.id}, -1)">&minus;</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="app.updateQty(${item.id}, 1)">&plus;</button>
        </div>
        <div class="cart-item-actions">
          <button class="btn-danger" onclick="app.removeFromCart(${item.id})">削除</button>
        </div>
      </div>
    `).join('');

    document.getElementById('cart-total-price').textContent =
      `\u00a5${this.getCartTotal().toLocaleString()}`;
  },

  // ===== ギフト送信 =====
  sendGift() {
    const recipientName = document.getElementById('recipient-name').value.trim();
    const message = document.getElementById('gift-message').value.trim();

    if (!recipientName) {
      this.showToast('お相手の名前を入力してください');
      document.getElementById('recipient-name').focus();
      return;
    }

    if (this.cart.length === 0) {
      this.showToast('カートにギフトを追加してください');
      return;
    }

    // 履歴に追加
    const record = {
      id: Date.now(),
      date: new Date().toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      recipient: recipientName,
      message: message,
      items: this.cart.map(item => ({
        name: item.name,
        emoji: item.emoji,
        price: item.price,
        qty: item.qty
      })),
      total: this.getCartTotal()
    };

    this.history.unshift(record);

    // 送信完了画面の表示
    document.getElementById('sent-recipient').textContent =
      `${recipientName} さんへ`;
    document.getElementById('sent-message-preview').textContent =
      message ? `「${message}」` : '';

    // カートとフォームをリセット
    this.cart = [];
    document.getElementById('recipient-name').value = '';
    document.getElementById('gift-message').value = '';

    this.saveToStorage();
    this.updateCartBadge();
    this.showPage('sent');
  },

  // ===== 送信履歴 =====
  renderHistory() {
    const listEl = document.getElementById('history-list');
    const emptyEl = document.getElementById('history-empty');

    if (this.history.length === 0) {
      listEl.style.display = 'none';
      emptyEl.style.display = 'block';
      return;
    }

    emptyEl.style.display = 'none';
    listEl.style.display = 'flex';

    listEl.innerHTML = this.history.map(record => `
      <div class="history-card">
        <div class="history-header">
          <span class="history-recipient">${record.recipient} さんへ</span>
          <span class="history-date">${record.date}</span>
        </div>
        <div class="history-items">
          ${record.items.map(item => `
            <span class="history-item">
              ${item.emoji} ${item.name} &times;${item.qty}
            </span>
          `).join('')}
        </div>
        ${record.message ? `<div class="history-message">「${this.escapeHtml(record.message)}」</div>` : ''}
        <div class="history-total">合計: &yen;${record.total.toLocaleString()}</div>
      </div>
    `).join('');
  },

  // ===== ユーティリティ =====
  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  showToast(message) {
    // 既存のトーストを削除
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
  },

  // ===== LocalStorage =====
  saveToStorage() {
    localStorage.setItem('giftbox_cart', JSON.stringify(this.cart));
    localStorage.setItem('giftbox_history', JSON.stringify(this.history));
  },

  loadFromStorage() {
    try {
      const cart = localStorage.getItem('giftbox_cart');
      const history = localStorage.getItem('giftbox_history');
      if (cart) this.cart = JSON.parse(cart);
      if (history) this.history = JSON.parse(history);
    } catch (e) {
      // ストレージエラーは無視
    }
  }
};

// アプリ起動
document.addEventListener('DOMContentLoaded', () => app.init());
