// Konfiguratsiya (o'zbek - latin)
const CONFIG = {
    API_BASE_URL: '/',
    CATEGORIES: [
        { id:1, name:'shonen', title:'Shonen', color:'badge-shonen' },
        { id:2, name:'sarguzasht', title:'Sarguzasht', color:'badge-adventure' },
        { id:3, name:'romantika', title:'Romantika', color:'badge-romance' },
        { id:4, name:'harakat', title:'Harakat', color:'badge-action' },
        { id:5, name:'komediya', title:'Komediya', color:'badge-comedy' }
    ],
    DEFAULT_ANIMES: [
        {
            id:1,
            title: "Naruto Shippuden",
            code: "NS001",
            category: "shonen",
            image: "https://via.placeholder.com/400x600/8B5CF6/ffffff?text=Naruto",
            episodes:[
                { number:1, title:"Boshlanish", videoUrl:"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", downloadUrl:"#", duration:"24:00", views:1250 }
            ],
            description: "Nindzalar haqidagi sarguzasht. Naruto o'z maqsadiga erishadi.",
            rating:9.2,
            year:2007,
            status: "Davom etmoqda",
            totalViews:15420,
            addedDate: "2024-01-15"
        },
        {
            id:2,
            title: "One Piece",
            code: "OP001",
            category: "sarguzasht",
            image: "https://via.placeholder.com/400x600/3B82F6/ffffff?text=One+Piece",
            episodes:[
                { number:1, title:"Dengizga qadam", videoUrl:"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", downloadUrl:"#", duration:"23:00", views:2100 }
            ],
            description: "Luffi va jamoasining xazina izlash sarguzashti.",
            rating:9.5,
            year:1999,
            status: "Davom etmoqda",
            totalViews:28750,
            addedDate: "2024-01-20"
        }
    ],
    DEFAULT_USERS: [
        { id:1, username:"user1", email:"user1@example.com", role:"user", banned:false, joinDate:"2024-01-10", lastActive:"2024-09-19" },
        { id:2, username:"admin", email:"admin@example.com", role:"admin", banned:false, joinDate:"2023-12-01", lastActive:"2024-09-19" }
    ]
};
