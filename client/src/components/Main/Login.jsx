import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import { Link, useActionData, useNavigate } from 'react-router-dom';
import useAppContext from '../../Context/AppContext';

const Login = () => {

  const { setCurrentUser, setLoggedIn } = useAppContext();

  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch("http://localhost:5000/user/authenticate", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        },


      })
      console.log(res.status);
      if (res.status === 200) {
        setLoggedIn(true);
        const data = await res.json();
        console.log(data);
        setCurrentUser(data);
        sessionStorage.setItem('isloggedin', true);
        if (data.role === 'admin') {
          sessionStorage.setItem('admin', JSON.stringify(data));
          enqueueSnackbar("Admin loggedIn Successfully", { variant: "success" })
          navigate('/Admin/Dashboard');
        } else {
          sessionStorage.setItem('user', JSON.stringify(data));
          setLoggedIn(true);
          enqueueSnackbar("user loggedIn Successfully", { variant: "success" })
          navigate("/User/Profile")
        }
      } else {
        enqueueSnackbar("somthing went wrong", { variant: "warning" })
      }
    }
  });
  return (

    <section className="bg-orange-200 min-h-screen flex box-border justify-center items-center">
      <div className="shadow-2xl rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-orange-900 font-serif">Login</h2>
          <p className="text-sm mt-4 mb-3 text-orange">
            If you already a member, easily log in now.
          </p>
          <form onSubmit={loginForm.handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8] rounded-xl border"
              type="email"
              name="email"
              id="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              placeholder="Email"
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                id="password"
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                placeholder="Password"
              />

            </div>
            <div className=" text-sm  text-lue-900 border-gray-500  ">
              Forget password?
            </div>
            <button
              className="bg-orange-900 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-orange-700 font-medium"
              type="submit"
            >
              Login
            </button>
          </form>



          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
            <Link to="/Main/Signup" className="text-white bg-orange-900 hover:border-orange-700 rounded-xl py-2 px-5 hover:scale-105 hover:bg-orange-700 font-semibold duration-300">
              Register
            </Link>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://i.pinimg.com/236x/8d/8b/16/8d8b16836f523a96537bdae473914694.jpg"
            alt="login form image"
          />
        </div>
      </div>
    </section>


  )
}

export default Login