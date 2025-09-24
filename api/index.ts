import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes"; // <-- Түзетілген жол
// setupVite және serveStatic функциялары қазіргі сервер үшін қажет емес, себебі Vercel оны өзі басқарады.

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging (бұл кодты өзгеріссіз қалдыруға болады)
app.use((req, res, next) => {
  const start = Date.now();
  // ... (қалған logging коды сол күйінше қалады)
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Register API routes
registerRoutes(app);

// Vercel-ге export жасау
export default app;
