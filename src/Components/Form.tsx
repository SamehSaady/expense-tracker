import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(1, { message: "Amount must be greater than or equal to 1." }),
  category: z.string(),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit((data: FieldValues) => console.log(data))}>
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
        <select id="category" className="form-select">
          <option selected>Groceries</option>
          <option value="1">Utilities</option>
          <option value="2">Entertainment</option>
        </select>
      </div>

      <button className="btn btn-primary mb-5" type="submit">
        Submit
      </button>

      <div className="mb-3">
        <select id="filter" title="Filter Categories" className="form-select">
          <option selected>All Categories</option>
          <option value="1">Utilities</option>
          <option value="2">Entertainment</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
