"use client";
import { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

export const DatabaseContext = createContext(null as any);
export const useDatabase = (): ReturnType<typeof createClient<Database>> =>
  useContext(DatabaseContext);
