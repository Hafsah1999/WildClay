



import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(6, 'Too short')
    .max(20, 'Too long'),
  email: Yup.string().required('Required').email('Invalid email'),
  message: Yup.string().required('Required'),
})



const Contact = () => {
  const navigate = useNavigate();


  const FeedbackForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },


    onSubmit: async (values, action) => {

      console.log(values);

      const res = await fetch('http://localhost:5000/Contact/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }

      });
      console.log(res.status)
      action.resetForm();

      if (res.status === 200) {
        toast('Contact form submitted successfully')
        navigate('/Contact');
      } else {
        toast("Something went wrong")
      }
    },

    validationSchema: FeedbackSchema

  })
  return (
    <div className='pt-16'>

      <div className="bg-img-contact">


        <div className="card w-75 bg-light bg-opacity-25 contact-card-1 shadow-lg">
          <div className="row ">

            <div className="col-md-2 bg-red-700" style={{ height: "500px" }}>

            </div>
            <div className="card border-none shadow  mt-5 d-flex justify-content-center ms-4" style={{ height: "400px",backgroundImage:"url(https://i.pinimg.com/564x/77/4d/84/774d84850127921095e6ac1c372f8954.jpg)",backgroundSize:"cover", width: "350px", position: "absolute" }}>
              
              {/* <h2 className="ms-4 mb-5">Info</h2>
              <p className=" mb-4 fs-5"><i className="me-2 ms-4 fa-regular fa-envelope"></i>infofetintouch.we</p>
              <p className=" fs-5 mb-4"><i className="me-2 ms-4 fa-solid fa-phone"></i>9876543210</p>
              <p className=" fs-5"><i className="me-2 ms-4 fa-regular fa-address-card"></i>123,Tej Kumar Plaza , <span className="ms-5">Hazratganj Lucknow.</span> </p> */}
            </div>
            <div className="col-md-10 px-4 py-3">
              <div className="card w-50 mt-5   bg-transparent" style={{ marginLeft: "200px", height: "400px", border: "none" }}>
                <h1 className="  ms-4 fw-bold">Get in Touch</h1>
                <p className="ms-4 fs-5 text-secondary ">Feel free to contact us anytime.We will get<br /> back to you as soon as we can.</p>


                <div className="card-body ">
                  <form className='w-75 ' onSubmit={FeedbackForm.handleSubmit}>
                    <span style={{ color: 'red', fontsize: '10', marginLeft: '50' }}>{FeedbackForm.touched.name && FeedbackForm.errors.name}</span>
                    <input type="text" placeholder="name" className="form-control mb-3 input-contact" id="name" value={FeedbackForm.values.name} onChange={FeedbackForm.handleChange} />
                    <span style={{ color: 'red', fontsize: '10' }}>{FeedbackForm.touched.email && FeedbackForm.errors.email}</span>

                    <input type="email" placeholder="email" className="form-control  mb-3 input-contact" id="email" value={FeedbackForm.values.email} onChange={FeedbackForm.handleChange} />
                    <span style={{ color: 'red', fontsize: '10', }}>{FeedbackForm.touched.message && FeedbackForm.errors.message}</span>

                    <textarea type="message" placeholder="message" className="form-control input-contact" id="message" value={FeedbackForm.values.message} onChange={FeedbackForm.handleChange} />



                    <button type="submit" className="btn btn-outline-light w-100 text-dark   mt-4 fs-5 p-1  " style={{ fontFamily: "serif" }}>Submit</button>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>




  )
}

export default Contact


