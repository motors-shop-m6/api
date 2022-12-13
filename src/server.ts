import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./data-source";

(async (): Promise<void> => {
  await AppDataSource.initialize().catch(async (err: Error) => {
    console.log(`Error during Data Source Initialization, ${err}`);
  });

  app.listen(process.env.PORT || 3000, async () =>
    console.log("Server running")
  );
})();
