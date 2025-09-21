// localStorage asosida oddiy DB
class Database {
    constructor(){ this.init(); }
    init(){
        if(!localStorage.getItem('animes')) localStorage.setItem('animes', JSON.stringify(CONFIG.DEFAULT_ANIMES));
        if(!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(CONFIG.DEFAULT_USERS));
    }
    async getAnimes(){ return JSON.parse(localStorage.getItem('animes')||'[]'); }
    async getUsers(){ return JSON.parse(localStorage.getItem('users')||'[]'); }
    async createAnime(anime){
        const animes = await this.getAnimes();
        const newA = {...anime, id: Date.now(), addedDate: new Date().toISOString().split('T')[0], totalViews:0};
        animes.push(newA);
        localStorage.setItem('animes', JSON.stringify(animes));
        return newA;
    }
    async updateAnime(id, updates){
        let animes = await this.getAnimes();
        animes = animes.map(a=> a.id===id ? {...a, ...updates} : a);
        localStorage.setItem('animes', JSON.stringify(animes));
        return animes.find(a=>a.id===id);
    }
    async deleteAnime(id){
        let animes = await this.getAnimes();
        animes = animes.filter(a=>a.id!==id);
        localStorage.setItem('animes', JSON.stringify(animes));
        return true;
    }
    async createUser(user){
        const users = await this.getUsers();
        if(users.find(u=>u.username===user.username)) throw new Error('Foydalanuvchi mavjud');
        const newU = {...user, id:Date.now(), role:'user', banned:false, joinDate:new Date().toISOString().split('T')[0], lastActive:new Date().toISOString().split('T')[0]};
        users.push(newU);
        localStorage.setItem('users', JSON.stringify(users));
        return newU;
    }
    async authenticate(username, password){
        const users = await this.getUsers();
        const u = users.find(x=>x.username===username && !x.banned);
        if(!u) throw new Error('Noto'g'ri ma'lumot yoki bloklangan');
        u.lastActive = new Date().toISOString().split('T')[0];
        localStorage.setItem('users', JSON.stringify(users));
        return u;
    }
    async getStatistics(){
        const animes = await this.getAnimes();
        const users = await this.getUsers();
        return {
            totalAnimes: animes.length,
            totalEpisodes: animes.reduce((s,a)=>s + (a.episodes?.length||0),0),
            totalUsers: users.length,
            totalViews: animes.reduce((s,a)=>s + (a.totalViews||0),0)
        };
    }
}
const db = new Database();
