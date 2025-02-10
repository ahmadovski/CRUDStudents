import axios from "axios";
import { Item } from "../types/item";

/* 
 	•	GET http://localhost:3000/items (Fetch all items)
	•	POST http://localhost:3000/items (Add a new item)
	•	PUT http://localhost:3000/items/:id (Update an item)
	•	DELETE http://localhost:3000/items/:id (Delete an item)
*/

const API_URL = "http://localhost:3000/items";

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item: Omit<Item, "id">) => {
  //id will be given by backend
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (
  id: Item["id"],
  updatedItem: Omit<Item, "id">
) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
};

export const deleteItem = async (id: Item["id"]) => {
  await axios.delete(`${API_URL}/${id}`);
};
