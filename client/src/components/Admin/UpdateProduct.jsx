import { Formik } from "formik";
import  { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [selFile, setSelFile] = useState("");

  const navigate = useNavigate();

  const fetchproductData = async () => {
    const res = await fetch("http://localhost:5000/product/getbyid/" + id);
    const data = await res.json();

    console.log(data);
    setProductData(data);
  };

  useEffect(() => {
    fetchproductData();
  }, []);

  const submitForm = async (values) => {
    console.log(values);
    values.simage = selFile;
    const res = await fetch('http://localhost:5000/product/update/' + id, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(res.status);

    if (res.status === 200) {
    toast("Updated successfully")
      navigate('/Product');
    }
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };

  return (
    <div>
      <div className="col-md-3 mx-auto pt-5">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center my-5">Update Service</h3>
            {productData !== null ? (
              <Formik initialValues={productData} onSubmit={submitForm}>

                {(addProductForm) => (

                  <form onSubmit={addProductForm.handleSubmit}>
                    <label>Product Name</label>

                    <span
                      style={{ color: "red", fontSize: 10, marginLeft: 10 }}
                    >
                      {addProductForm.errors.pname}
                    </span>
                    <input
                      id="pname"
                      onChange={addProductForm.handleChange}
                      value={addProductForm.values.pname}
                      type="text"
                      className="form-control mb-4"
                    />

                    <label>Product Category</label>
                    <span
                      style={{ color: "red", fontSize: 10, marginLeft: 10 }}
                    >
                      {addProductForm.errors.pcategory}
                    </span>
                    <input
                      id="pcategory"
                      onChange={addProductForm.handleChange}
                      value={addProductForm.values.pcategory}
                      type="text"
                      className="form-control mb-4"
                    />
                      <label>Product Price</label>
                    <span
                      style={{ color: "red", fontSize: 10, marginLeft: 10 }}
                    >
                      {addProductForm.errors.pprice}
                    </span>
                    <input
                      id="pprice"
                      onChange={addProductForm.handleChange}
                      value={addProductForm.values.pprice}
                      type="text"
                      className="form-control mb-4"
                    />

                    <label>Product Description</label>
                    <input
                      id="pdetail"
                      onChange={addProductForm.handleChange}
                      value={addProductForm.values.pdetail}
                      type="text"
                      className="form-control mb-4"
                    />

                    <label>Upload Image</label>
                    <input
                      type="file"
                      id="pimage"
                      className="form-control mb-4"
                      placeholder="Upload Image"
                      onChange={uploadFile} />

                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            ) : (
              <h1 className="text-center my-5">Loading ... </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;