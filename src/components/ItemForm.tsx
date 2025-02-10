import { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Item } from "../types/item";
import { createItem, updateItem } from "../services/itemService";

interface ItemFormProps {
  item?: Item | null; // Allow item to be null or undefined
  onItemCreated: () => void; // Callback to refresh the list after action
}

const ItemForm = ({ item, onItemCreated }: ItemFormProps) => {
  const [name, setName] = useState<string>(item?.name || "");
  const [description, setDescription] = useState<string>(
    item?.description || ""
  );

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { name, description };

    if (item) {
      // Update the item if the item is passed (for edit)
      await updateItem(item.id, newItem);
    } else {
      // Create a new item if no item is passed
      await createItem(newItem);
    }

    onItemCreated(); // Refresh items after creation/update
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ width: "300px", margin: "20px auto" }}
    >
      <Typography variant='h6'>
        {item ? "Update Item" : "Create Item"}
      </Typography>
      <TextField
        label='Name'
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label='Description'
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button type='submit' variant='contained' color='primary'>
        {item ? "Update" : "Create"}
      </Button>
    </Box>
  );
};

export default ItemForm;
