import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Components
import Header from "./components/Header";
import AnimeGallery from "./components/AnimeGallery";
import VideoPlayer from "./components/VideoPlayer";
import LoginModal from "./components/LoginModal";
import AdminDashboard from "./components/AdminDashboard";

// Mock data - todo: remove mock functionality

const MOCK_CATEGORIES = [
  { id: 1, name: 'shonen', title: 'Shonen', color: 'bg-blue-500' },
  { id: 2, name: 'adventure', title: 'Adventure', color: 'bg-green-500' },
  { id: 3, name: 'romance', title: 'Romance', color: 'bg-pink-500' },
  { id: 4, name: 'action', title: 'Action', color: 'bg-red-500' },
  { id: 5, name: 'comedy', title: 'Comedy', color: 'bg-yellow-500' },
  { id: 6, name: 'drama', title: 'Drama', color: 'bg-purple-500' }
];

const MOCK_ANIMES = [
  {
    id: "1",
    title: "Naruto Shippuden",
    category: "shonen",
    image: "https://via.placeholder.com/400x600/8B5CF6/ffffff?text=Naruto",
    description: "Ниндзя дүниесіндегі ең күшті оқиға. Naruto өз арманына жету үшін күреседі.",
    rating: 9.2,
    year: 2023,
    status: "Жалғасуда",
    totalViews: 15420,
    episodeCount: 3
  },
  {
    id: "2",
    title: "One Piece",
    category: "adventure", 
    image: "https://via.placeholder.com/400x600/3B82F6/ffffff?text=One+Piece",
    description: "Теңіз қорғаушылары туралы керемет оқиға. Luffy және оның командасы қазынаны іздейді.",
    rating: 9.5,
    year: 2023,
    status: "Жалғасуда",
    totalViews: 28750,
    episodeCount: 2
  },
  {
    id: "3",
    title: "Attack on Titan",
    category: "action",
    image: "https://via.placeholder.com/400x600/EF4444/ffffff?text=Attack+Titan",
    description: "Титандармен күрес туралы қорқынышты және қызық оқиға.",
    rating: 9.8,
    year: 2023,
    status: "Аяқталды",
    totalViews: 35600,
    episodeCount: 1
  } // <-- МІНЕ ОСЫ ЖЕРДЕ ҮТІР ТҰРУЫ КЕРЕК ЕДІ, БІРАҚ ТІЗІМ АЯҚТАЛҒАНДЫҚТАН ҚАЖЕТ ЕМЕС. ҚАТЕ БҰРЫНҒЫ КОДТА ОСЫНЫҢ АЛДЫНДА БОЛҒАН.
];

const MOCK_USERS = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    role: "user",
    banned: false,
    joinDate: "2024-01-10",
    lastActive: "2024-09-19"
  },
  {
    id: "2",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    banned: false,
    joinDate: "2023-12-01",
    lastActive: "2024-09-19"
  }
];

const MOCK_STATS = {
  totalAnimes: 3,
  totalEpisodes: 6,
  totalUsers: 2,
  totalViews: 79770,
  activeUsers: 2,
  bannedUsers: 0
};

interface AppState {
  currentView: 'gallery' | 'player' | 'admin';
  user: { username: string; role: string } | null;
  currentAnime: string | null;
  showLoginModal: boolean;
}

function Router() {
  const [state, setState] = useState<AppState>({
    currentView: 'gallery',
    user: null, // Start with no user logged in
    currentAnime: null,
    showLoginModal: false
  });

  const handleLogin = (username: string, password: string) => {
    // Mock authentication - todo: implement real authentication
    const user = MOCK_USERS.find(u => u.username === username);
    if (user) {
      setState(prev => ({
        ...prev,
        user: { username: user.username, role: user.role },
        showLoginModal: false
      }));
      console.log('User logged in:', username);
    }
  };

  const handleLogout = () => {
    setState(prev => ({
      ...prev,
      user: null,
      currentView: 'gallery'
    }));
    console.log('User logged out');
  };

  const handlePlayAnime = (animeId: string) => {
    setState(prev => ({
      ...prev,
      currentView: 'player',
      currentAnime: animeId
    }));
    console.log('Playing anime:', animeId);
  };

  const handleBackToGallery = () => {
    setState(prev => ({
      ...prev,
      currentView: 'gallery',
      currentAnime: null
    }));
  };

  const handleAdminPanel = () => {
    setState(prev => ({
      ...prev,
      currentView: 'admin'
    }));
  };

  const currentAnimeData = MOCK_ANIMES.find(anime => anime.id === state.currentAnime);

  return (
    <Switch>
      <Route path="/">
        <div className="min-h-screen">
          <Header
            user={state.user}
            onSearch={(query) => console.log('Search:', query)}
            onLogin={() => setState(prev => ({ ...prev, showLoginModal: true }))}
            onLogout={handleLogout}
            onAdminPanel={handleAdminPanel}
          />
          
          {state.currentView === 'gallery' && (
            <AnimeGallery
              animes={MOCK_ANIMES}
              categories={MOCK_CATEGORIES}
              onPlayAnime={handlePlayAnime}
              onShowDetails={(id) => console.log('Show details:', id)}
            />
          )}

          {state.currentView === 'player' && currentAnimeData && (
            <div className="container mx-auto px-4 py-8">
              <div className="mb-4">
                <button
                  onClick={handleBackToGallery}
                  className="text-white hover:text-primary transition-colors"
                  data-testid="button-back-to-gallery"
                >
                  ← Артқа қайту
                </button>
              </div>
              <VideoPlayer
                src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                title={`${currentAnimeData.title} - 1 эпизод`}
                onNext={() => console.log('Next episode')}
                onPrevious={() => console.log('Previous episode')}
              />
              <div className="mt-6 glass-effect p-6 rounded-lg border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-2">{currentAnimeData.title}</h2>
                <p className="text-white/80 mb-4">{currentAnimeData.description}</p>
                <div className="flex gap-4 text-sm text-white/60">
                  <span>Рейтинг: {currentAnimeData.rating}</span>
                  <span>Жыл: {currentAnimeData.year}</span>
                  <span>Статус: {currentAnimeData.status}</span>
                  <span>Көрулер: {currentAnimeData.totalViews.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {state.currentView === 'admin' && (
            <AdminDashboard
              stats={MOCK_STATS}
              animes={MOCK_ANIMES}
              users={MOCK_USERS}
              onAddAnime={() => console.log('Add anime')}
              onEditAnime={(id) => console.log('Edit anime:', id)}
              onDeleteAnime={(id) => console.log('Delete anime:', id)}
              onBanUser={(id) => console.log('Ban user:', id)}
              onUnbanUser={(id) => console.log('Unban user:', id)}
              onPromoteUser={(id) => console.log('Promote user:', id)}
            />
          )}

          <LoginModal
            isOpen={state.showLoginModal}
            onClose={() => setState(prev => ({ ...prev, showLoginModal: false }))}
            onLogin={handleLogin}
            onRegister={(username, email, password) => {
              console.log('Register:', username, email);
              // Mock registration - todo: implement real registration
              const newUser = { username, role: 'user' };
              setState(prev => ({
                ...prev,
                user: newUser,
                showLoginModal: false
              }));
            }}
          />
        </div>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
