import { useReducer, useEffect, ReactNode } from "react";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../services/itemService";
import { ItemsContext } from "./ItemsContext";
import { Item } from "../types/item";

// Define actions
type Action =
  | { type: "SET_ITEMS"; payload: Item[] }
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "UPDATE_ITEM"; payload: Item }
  | { type: "DELETE_ITEM"; payload: Item["id"] };

// State type
type State = {
  items: Item[];
};

// Initial state
const initialState: State = {
  items: [],
};

// Reducer function
const itemsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Provider component
export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  // Fetch items from the API
  const fetchItems = async () => {
    const data = await getItems();
    dispatch({ type: "SET_ITEMS", payload: data });
  };

  // Create a new item
  const addItem = async (newItem: Omit<Item, "id">) => {
    const createdItem = await createItem(newItem);
    dispatch({ type: "ADD_ITEM", payload: createdItem });
  };

  // Update an item
  const editItem = async (updatedItem: Item) => {
    const result = await updateItem(updatedItem.id, updatedItem);
    dispatch({ type: "UPDATE_ITEM", payload: result });
  };

  // Delete an item
  const removeItem = async (id: Item["id"]) => {
    await deleteItem(id);
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  // Load items when the provider is mounted
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider
      value={{ items: state.items, fetchItems, addItem, editItem, removeItem }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
