// UI components - Uzbek (Latin)
class UI {
    static header(user){
        return `
        <div class="container header">
            <div style="display:flex;align-items:center;gap:12px">
                <h1 style="font-size:20px">🎌 AnimeSayt</h1>
                ${user ? `<div class="glass" style="padding:6px 10px;border-radius:8px">${user.username} <span class="badge" style="margin-left:8px">${user.role}</span></div>` : ''}
            </div>
            <div style="display:flex;align-items:center;gap:8px">
                <input id="searchInput" class="search" placeholder="Anime qidirish..." />
                ${user ? `<button class="primary-btn" onclick="app.logout()">Chiqish</button>` : `<button class="primary-btn" onclick="app.showLogin()">Kirish</button>`}
            </div>
        </div>
        `;
    }
    static animeCard(a){
        return `
        <div class="card">
            <img src="${a.image}" alt="${a.title}" onerror="this.src='https://via.placeholder.com/400x600?text=No+Image'"/>
            <div style="padding:12px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <h3 style="font-size:16px">${a.title}</h3>
                    <span class="badge">${a.rating}</span>
                </div>
                <p style="opacity:0.9;margin:8px 0;font-size:13px">${a.description}</p>
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="display:flex;gap:8px;align-items:center"><i data-lucide='eye'></i>${a.totalViews}</div>
                    <div><button class="primary-btn" onclick="app.playAnime(${a.id})">Ko'rish</button></div>
                </div>
            </div>
        </div>
        `;
    }
    static loginModal(){
        return `
        <div class="modal" id="loginModal">
            <div class="modal-box">
                <h2>Kiruvchi / Ro'yxat</h2>
                <div style="display:flex;gap:8px;margin:12px 0">
                    <input id="username" placeholder="Foydalanuvchi nomi" class="search"/>
                    <input id="email" placeholder="Email (ro'yxat uchun)" class="search" style="display:none"/>
                </div>
                <div style="display:flex;gap:8px;margin-bottom:12px">
                    <input id="password" placeholder="Parol" type="password" class="search"/>
                    <button class="primary-btn" id="authBtn">Kirish</button>
                </div>
                <div style="opacity:0.8;font-size:13px">
                    Sinov hisoblar: admin/admin  user1/user1
                </div>
                <div style="margin-top:12px;text-align:right"><button onclick="app.closeLogin()" class="primary-btn">Yopish</button></div>
            </div>
        </div>
        `;
    }
    static videoModal(a, e){
        return `
        <div class="modal" id="videoModal">
            <div class="modal-box">
                <h3>${a.title} - EP ${e.number} : ${e.title}</h3>
                <video id="mainVideo" controls style="width:100%;max-height:60vh"><source src="${e.videoUrl}" /></video>
                <p style="margin-top:8px">Ko'rishlar: ${e.views} • Davomiylik: ${e.duration}</p>
                <div style="text-align:right;margin-top:8px"><button class="primary-btn" onclick="app.closeVideo()">Yopish</button></div>
            </div>
        </div>
        `;
    }
}
