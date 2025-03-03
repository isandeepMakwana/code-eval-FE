import { Server } from "../types/index";

export const servers: Server[] = [
  { id: "dev", name: "Server 1", url: process.env.NEXT_PUBLIC_DEV_API_URL },
  { id: "prod", name: "Server 2", url: process.env.NEXT_PUBLIC_PROD_API_URL },
];
