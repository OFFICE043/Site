import { type User, type InsertUser } from "./schema";
import { randomUUID } from "crypto";

// IStorage интерфейсін бұрынғыша қалдырамыз
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const newUser: User = { 
      id: id,
      username: insertUser.username,
      email: insertUser.email,
      role: 'user',
      banned: false,
      joinDate: new Date(),
      lastActive: new Date()
    };
    this.users.set(id, newUser);
    return newUser;
  }
}

export const storage = new MemStorage();
