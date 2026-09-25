export type Item = {
  name: string;
  id: string;
  price: number;
};

let items: Item[] = [
  {
    name: "White Top",
    id: "woman",
    price: 7.95
  },
];

export async function getItem(itemId: string) {
  return items.find((item) => item.id === itemId);
}

export async function updateItem(itemId: string, values: Partial<Item>) {
  let item = items.find((item) => item.id === itemId);

  if (item === undefined) {
    return undefined;
  }

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  Object.assign(item, values);
  return item;
}