import { createContext } from "react";
import { Item } from "../types/item";

// Context type
type ItemsContextType = {
  items: Item[];
  fetchItems: () => Promise<void>;
  addItem: (newItem: Omit<Item, "id">) => Promise<void>;
  editItem: (updatedItem: Item) => Promise<void>;
  removeItem: (id: Item["id"]) => Promise<void>;
};

// ✅ Explicitly define the type when creating the context
export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined
);
