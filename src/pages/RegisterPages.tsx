import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useAppDispatch } from "../redux/hooks";
import axios from "axios";
import { addUser } from "../redux/slices/usersSlices";
YupPassword(Yup);

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Requires").min(6),
  email: Yup.string().email().required("Email is Required"),
  password: Yup.string()
    .required("password is required")
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});

const RegisterPages = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/users", {
          ...values,
          id: Date.now(),
        });
        dispatch(addUser(response.data));
        alert("Registration succesfull!");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
  });

  return (
    <div className="h-screen w-full bg-slate-200 pt-20">
      <div className="container m-auto w-1/4 rounded-md bg-white p-4">
        <h1 className="mb-4 mt-2 text-xl font-bold text-slate-700">
          Enter Your Details
        </h1>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-slate-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              className="placeholder: w-full rounded border border-slate-800 px-3 py-2 text-sm text-slate-700 opacity-50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="text-red-600">{formik.errors.name}</p>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="placeholder: w-full rounded border border-slate-800 px-3 py-2 text-sm text-slate-700 opacity-50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.errors.email && formik.touched.email ? (
              <p className="text-red-700">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              className="placeholder: w-full rounded border border-slate-800 px-3 py-2 text-sm text-slate-700 opacity-50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.errors.password && formik.touched.password ? (
              <p className="text-red-700">{formik.errors.password}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="h-10 rounded-md bg-blue-700 px-6 font-semibold text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPages;
