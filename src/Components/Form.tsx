import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateOptions } from "./DropDownList";
import { Category, categories } from "../App";

interface Props {
  addProduct: (escription: string, amount: number, category: Category) => void;
}

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters." })
    .max(50, { message: "Description shouldn't exceed 50 characters." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(1, { message: "Amount must be greater than or equal to 1." }),
  category: z.string(),
});

type FormData = z.infer<typeof schema>;

const Form = ({ addProduct }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // const onSubmit = (data: FieldValues) =>
  //   console.log(new Product(data.description, data.amount, data.category));

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addProduct(data.description, data.amount, data.category as Category);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount:
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <select {...register("category")} id="category" className="form-select">
          {generateOptions(categories)}
        </select>
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
