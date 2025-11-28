// setup.js
import { execSync } from "child_process";

try {
  console.log("🔹 Actualizando base de datos con prisma db push...");
  execSync("npx prisma db push", { stdio: "inherit" });

  console.log("🔹 Ejecutando seed...");
  execSync("node prisma/seed.js", { stdio: "inherit" });

  console.log("✅ Base de datos lista.");
  console.log("-----------------------------");
  console.log("-----------------------------");
} catch (error) {
  console.error("❌ Error preparando la base:", error);
}
