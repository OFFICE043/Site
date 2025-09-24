import { Router } from "express";
import { storage } from "./storage";

const router = Router();

// Example user route
router.get("/users/:id", async (req, res) => {
  const user = await storage.getUser(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});

export function registerRoutes(app: any) {
    app.use('/api', router);
    return app; // Return app for server chaining
}
