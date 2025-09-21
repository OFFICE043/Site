// Main app
class AnimeApp {
    constructor(){
        this.animes = [];
        this.filtered = [];
        this.init();
    }
    async init(){
        document.getElementById('app').innerHTML = '<div class="container">Yuklanmoqda...</div>';
        if(typeof lucide !== 'undefined') lucide.createIcons();
        await new Promise(r=>setTimeout(r,600));
        await this.loadData();
        this.renderHome();
        this.setupEvents();
    }
    async loadData(){
        this.animes = await db.getAnimes();
        this.filtered = [...this.animes];
    }
    renderHome(){
        const user = auth.getUser();
        document.getElementById('app').innerHTML = `
            <div class="container">
                ${UI.header(user)}
                <div style="margin-top:16px" class="glass">
                    <div style="padding:12px">
                        <h2>Yangi anime</h2>
                    </div>
                </div>
                <main style="margin-top:16px">
                    <div class="anime-grid">
                        ${this.filtered.map(a=> UI.animeCard(a)).join('')}
                    </div>
                </main>
                <div class="footer">© ${new Date().getFullYear()} AnimeSayt</div>
            </div>
        `;
        if(typeof lucide !== 'undefined') lucide.createIcons();
        // search handler
        const si = document.getElementById('searchInput');
        if(si) si.addEventListener('input', (e)=>{ this.filter(e.target.value) });
    }
    filter(q){
        if(!q) this.filtered = [...this.animes];
        else this.filtered = this.animes.filter(a=> a.title.toLowerCase().includes(q.toLowerCase()) || (a.code && a.code.toLowerCase().includes(q.toLowerCase())));
        this.renderHome();
    }
    showLogin(){
        document.body.insertAdjacentHTML('beforeend', UI.loginModal());
        document.getElementById('authBtn').addEventListener('click', async ()=>{
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            // simple: try login, else register
            let res = await auth.login(username, password);
            if(!res.success){
                res = await auth.register(username, email, password);
            }
            if(res.success){
                document.getElementById('loginModal')?.remove();
                await this.loadData();
                this.renderHome();
            } else {
                alert(res.error || 'Xato');
            }
        });
    }
    closeLogin(){ document.getElementById('loginModal')?.remove(); }
    logout(){ auth.logout(); this.renderHome(); }
    playAnime(id){
        const a = this.animes.find(x=>x.id===id);
        if(!a) return;
        const ep = a.episodes && a.episodes[0];
        document.body.insertAdjacentHTML('beforeend', UI.videoModal(a, ep));
    }
    closeVideo(){ document.getElementById('videoModal')?.remove(); }
}

window.app = new AnimeApp();
