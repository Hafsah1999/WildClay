import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from 'react-router-dom';

const Product = () => {

  const [Product, setProduct] = useState([]);
  const [masterList, setMasterList] = useState([])

  const fetchProductData = () => {
    fetch("http://localhost:5000/product/getall")
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProduct(data);
        setMasterList(data);
        const filters = [...new Set(data.map(product => (
          product.features.map(feature => feature.name)
        )).flat())]
        console.log(filters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const filterBtCategory = (category) => {
    console.log(category);
    const filteredCategory = masterList.filter(col => col.pcategory.toLowerCase().includes(category.toLowerCase()));
    setProduct(filteredCategory);
  }

  const filterByMaxPrice = (price) => {
    const filteredProduct = masterList.filter(product => product.pprice <= price);
    setProduct(filteredProduct);
  }

  const filterByMinPrice = (price) => {
    const filteredProduct = masterList.filter(product => product.pprice >= price);
    setProduct(filteredProduct);
  }

  const searchProduct = (e) => {
    const value = e.target.value;
    setProduct(masterList.filter((col) => {
      return (col.pname.toLowerCase().includes(value.toLowerCase()))
    }))
  }


  const displayProducts = () => {
    return Product.map((product) => {
      return <article className="bg-white  p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
        <Link

          to={'/Main/viewProduct/' + product._id}
          className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
        />
        <div className="relative mb-4 rounded-2xl">
          <img
            className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            src={'http://localhost:5000/' + product.image}
            alt=""
          />
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <FaHeart className='text-red-600' />
            <span className="ml-1 text-sm text-slate-400">2</span>
          </div>
          <Link
            className="flex justify-center items-center bg-orange-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
            to={'/Main/viewProduct/' + product._id}
            target="_self"
            rel="noopener noreferrer"
          >
            View Product
            <MdDoubleArrow className='text-2xl' />
          </Link>
        </div>
        <div className="flex justify-between items-center w-full pb-4 mb-auto">
          <div className="flex items-center">
            <div className="pr-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={"http://localhost:5000/" + product.image}
                alt=""
              />
            </div>
            <div className="flex flex-1">
              <div className="">
                <p className="text-md text-start font-semibold ">{product.pcategory}</p>

              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-xl flex items-center text-gray-500 ">
              {product.pprice}

            </div>
          </div>
        </div>
        <h3 className="font-medium text-xl leading-8">
          <Link
            to={"/Main/viewProduct/" + product._id}
            className="block relative group-hover:text-orange-700 transition-colors duration-200 "
          >
            {product.pname}
          </Link>
        </h3>
        <div></div>
      </article>
    })
  }


  return (
    <>
      <>
        {/* component */}


        <>
          {/* component */}
          {/* Creacte By Joker Banny */}
          <div className=" bg-orange-200 flex justify-center items-center">
            <div className="container mx-auto bg-orange-200 rounded-lg p-14">
              <form>
                <h1 className="text-center mb-3 font-bold text-orange-800 text-4xl">
                  Find the perfect Product
                </h1>
                <div className="sm:flex items-center mt-2 bg-orange-200 rounded-lg overflow-hidden px-2  justify-between">
                  <input
                    className="text-base mb-3 text-gray-400 flex-grow py-2 px-2 "
                    type="text"
                    placeholder="Search your product"
                    onChange={searchProduct}
                  />

                </div>
                <div className="text-white px-2 flex justify-evenly py-1 bg-orange-900 container font-serif text-xl">
                  <button id="Showpiece" value='a' onClick={(e) => filterBtCategory("Showpiece")} >Showpieces</button>
                  <button id="Decoration" value='a' onClick={(e) => filterBtCategory("Decoration")}>Decoration</button>
                  <button id="Water Container" value='a' onClick={(e) => filterBtCategory("Water Container")}>Water Container</button>
                  <button id="Utensil" value='a' onClick={(e) => filterBtCategory("Utensil")}>Utensils</button>
                </div>

              </form>
            </div>
          </div>
        </>


        <div
          className="bg-cover w-full flex justify-center items-center"
          style={{ backgroundImage: 'url("/images/mybackground.jpeg")' }}
        >
          <div className="w-full bg-white p-5  bg-opacity-40 backdrop-filter backdrop-blur-lg">
            <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
              <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
                {displayProducts()}

              </div>
            </div>
          </div>
        </div>
      </>

    </>
  )
}

export default Product