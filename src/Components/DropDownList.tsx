interface Props {
  items: string[];
  //   onSelectionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSelectionChange: (selectedItem: string) => void;
}

export function generateOptions(items: readonly string[]) {
  return items.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
}

// The first item will be selected by default.
const DrowDownList = ({ items, onSelectionChange }: Props) => {
  return (
    <div className="mb-3">
      <select
        id="filter"
        title="Filter Categories"
        className="form-select"
        onChange={(event) => onSelectionChange(event.target.value)}
      >
        {generateOptions(items)}
      </select>
    </div>
  );
};

export default DrowDownList;
