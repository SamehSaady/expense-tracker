import Product from "../models/Product";
import { sum } from "../Utils/NumUtils";
import { categoriesWithAll } from "../App";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
}

// The [rowIndex] is one-based.
function generateRow(product: Product, rowIndex: number, onDelete: () => void) {
  return (
    <tr key={product.id}>
      <th scope="row">{rowIndex}</th>
      <td>{product.discription}</td>
      <td>{product.amount}</td>
      <td>{product.category}</td>
      <td>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-danger delete_btn"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

const Table = ({ products, onDelete }: Props) => {
  const generateItemsRows = () => {
    return products.map((product, index) =>
      generateRow(product, index + 1, () => onDelete(product.id))
    );
  };

  const generateTotalRow = () => {
    return (
      <tr key={categoriesWithAll.length + 1}>
        <th scope="row" colSpan={2}>
          Total
        </th>
        <td colSpan={3}>{sum(products.map((p) => p.amount))}</td>
      </tr>
    );
  };

  if (products.length === 0) return null;

  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {generateItemsRows()}
          {generateTotalRow()}
          {null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
