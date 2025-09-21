// Auth manager
class AuthManager {
    constructor(){ this.current = null; this.load(); }
    load(){ const u = localStorage.getItem('currentUser'); if(u) this.current = JSON.parse(u); }
    save(){ if(this.current) localStorage.setItem('currentUser', JSON.stringify(this.current)); else localStorage.removeItem('currentUser'); }
    async login(username, password){
        try{
            const user = await db.authenticate(username, password);
            this.current = user; this.save();
            return {success:true, user};
        }catch(e){ return {success:false, error:e.message}; }
    }
    async register(username, email, password){
        try{
            const u = await db.createUser({username,email,password});
            this.current = u; this.save();
            return {success:true, user:u};
        }catch(e){ return {success:false, error:e.message}; }
    }
    logout(){ this.current = null; this.save(); }
    isLogged(){ return !!this.current; }
    isAdmin(){ return this.current && this.current.role === 'admin'; }
    getUser(){ return this.current; }
}
const auth = new AuthManager();
