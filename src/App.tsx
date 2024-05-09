import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import Product from "./models/Product";
import { produce } from "immer";
import DropDownList from "./components/DropDownList";

export const categories = ["Groceries", "Utilities", "Entertainment"] as const;
export const categoriesWithAll = ["All Categories", ...categories];

// Equivalent to "Groceries" | "Utilities" | "Entertainment":
export type Category = (typeof categories)[number];

function App() {
  const [products, setProducts] = useState([
    new Product(1, "Milk", 25, "Groceries"),
    new Product(2, "Laptop", 1200, "Utilities"),
    new Product(3, "Rice", 5, "Groceries"),
    new Product(4, "Keyboard", 150, "Utilities"),
    new Product(5, "Movies", 20, "Entertainment"),
  ]);

  const [selectedCategory, setSelectedCategory] = useState(
    categoriesWithAll[0]
  );

  const addProduct = (
    description: string,
    amount: number,
    category: Category
  ) => {
    const newProductId =
      products.length === 0 ? 1 : products[products.length - 1].id + 1;
    // setProducts(
    //   produce((draft) =>
    //     draft.push(new Product(newProductId, description, amount, category))
    //   )
    // );

    setProducts([
      ...products,
      new Product(newProductId, description, amount, category),
    ]);
  };

  const deleteProduct = (productId: number) =>
    setProducts(products.filter((p) => p.id !== productId));

  const filterProducts =
    selectedCategory === categoriesWithAll[0] // All Categories
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="mb-5">
        <Form addProduct={addProduct} />
      </div>

      <div className="mb-3">
        <DropDownList
          items={categoriesWithAll}
          onSelectionChange={(selecteditem) =>
            setSelectedCategory(selecteditem)
          }
        />
      </div>

      <Table products={filterProducts} onDelete={deleteProduct} />
    </div>
  );
}

export default App;
