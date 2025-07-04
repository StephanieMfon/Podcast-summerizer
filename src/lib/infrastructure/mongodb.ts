import { MongoClient, Db, Collection } from "mongodb";
import { Summary } from "@/types";

class MongoDB {
  private static instance: MongoDB;
  private client: MongoClient;
  private db: Db;

  private constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI!);
    this.db = this.client.db("PodcastSummariser");
  }

  static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  get summaries(): Collection<Summary> {
    return this.db.collection<Summary>("summaries");
  }
}

export default MongoDB;
