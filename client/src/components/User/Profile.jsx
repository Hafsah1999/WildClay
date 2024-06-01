import React from 'react'
import useAppContext from '../../Context/AppContext'
import { FaMessage } from 'react-icons/fa6';
import { Formik } from 'formik';
import { enqueueSnackbar } from 'notistack';

const Profile = () => {
  const { currentUser, setCurrentUser } = useAppContext();

  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('myfile', file)
    fetch(`http://localhost:5000/util/uploadfile`, {
      method: "POST",
      body: fd,
    }).then(res => {
      if (res.status === 200) {
        enqueueSnackbar('Profile image uploaded successfully')
        updateProfile({ avatar: file.name })
      }
    })
  }

  const updateProfile = (data) => {
    fetch(`http://localhost:5000/user/update/${currentUser._id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        console.log(res.status)
        enqueueSnackbar('Updated successfully')

        return res.json()
      })
      .then(data => {
        console.log(data),
          setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <>

        <section className="pt-16 grid grid-cols-3 bg-orange-200 py-8 border-b">
          <div className="w-full lg:w-full  col-span-1 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words bg-orange-100 w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="p-6">
                <div className="flex flex-wrap justify-center ">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-28">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-orange-900 mb-2">
                    {currentUser.firstname} {currentUser.lastname}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-orange-500 font-bold uppercase">
                    <FaMessage className="fas fa-map-marker-alt mr-2 text-lg text-orange-500" />
                    {currentUser.email}
                  </div>


                </div>

              </div>
            </div>
          </div>
          <div className="bg-orange-100 col-span-2 mx-6 rounded-lg shadow-lg">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              {/* text - start */}
              <div className="mb-10 md:mb-16">
                <h2 className="mb-4 pt-6 text-center text-2xl font-bold text-orange-800 font-serif md:mb-6 lg:text-3xl">
                  Update Profile
                </h2>

              </div>
              {/* text - end */}
              {/* form - start */}
              {
                <Formik initialValues={currentUser} onSubmit={updateProfile}>
                  {(updateProfile) => (


                    <form onSubmit={updateProfile.handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="first-name"
                          className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                          First Name
                        </label>
                        <input
                          type='text'
                          id="firstname"
                          value={updateProfile.values.firstname}
                          onChange={updateProfile.handleChange}
                          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last-name"
                          className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                          Last name*
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                          onChange={updateProfile.handleChange}
                          value={updateProfile.values.lastname}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="first-name"
                          className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                          Email*
                        </label>
                        <input
                          type='text'
                          id="email"
                          value={updateProfile.values.email}
                          onChange={updateProfile.handleChange}
                          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last-name"
                          className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                          Phone No.*
                        </label>
                        <input
                          type='text'
                          id="phone"
                          value={updateProfile.values.phone}
                          onChange={updateProfile.handleChange}
                          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                          Bio*
                        </label>
                        <textarea
                          name="message"
                          className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"

                        />
                      </div>
                      <div className="flex items-center justify-between sm:col-span-2">
                        <button type="submit" className="inline-block rounded-lg bg-orange-900 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-orange-800 mb-5 focus-visible:ring active:bg-orange-700 md:text-base">
                          Update
                        </button>

                      </div>

                    </form>
                  )}
                </Formik>
              }
              {/* form - end */}
            </div>
          </div>

        </section>
      </>

    </div>
  )
}

export default Profile