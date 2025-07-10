import "dotenv/config";
import { createServer } from "./frameworks/express/server";
import { connectToDatabase } from "./frameworks/mongoose/connect";
import { JwtPayload } from "./frameworks/jwt/types";

async function bootstrap() {
  try {
    await connectToDatabase();
    const app = createServer({});

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start app:", error);
    process.exit(1);
  }
}

bootstrap();
