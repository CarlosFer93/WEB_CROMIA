import { cacheLife } from "next/cache";

/**
 * Año actual para el copyright. Se calcula en el servidor y se cachea:
 * la página sigue siendo estática y el año se actualiza solo (revalidación diaria).
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
