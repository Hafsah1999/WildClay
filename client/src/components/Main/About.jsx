  import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const About = () => {
    

  const [feedbackList, setfeedbackList] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch('http://localhost:5000/feedback/getall');
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setfeedbackList(data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


 

    

  

    const displayfeedbackData = () => {
        if (feedbackList.length === 0) {
          return <h1 className='text-center fw-bold' style={{ color: "seagreen" }}>No Data Found</h1>
        }
    
        return feedbackList.map((feedback) => (
          <>
            <div className=' mt-4 '>
              <div className="card bg-slate-200 py-4" style={{ border: "none" }}>
                <div className="row">
                  <div className="col-md-2 ms-5 flex items-center content-center flex-col">
                  <img src={'http://localhost:5000/' + feedback.image} alt="" className=" img-fluid  rounded-lg "  style={{width:"80px",height:"90px"}}  />

                  </div>
                  <div className="col-md-9">
                  <h2 className=' fw-semibold  fs-5 mb-3' style={{ fontFamily: "serif" }}>{feedback.customername}</h2>
                  <p className='text-red-700'>{feedback.feedback}</p>
    
                  </div>
                </div>
              
                  
    
              </div>
            </div>
          </>
        ))
      }

    return (

        <>
   <div className='pt-16'>
            <div className="container p-5">
                <p className="fs-1 text-center mt-5 fw-semibold text-red-700" style={{ fontFamily: "serif" }}> Crafting Timeless Elegance with MudCraft</p>
                <p className="fs-5 text-center text-secondary mt-4 mb-5">Join us on a creative adventure! We make special things from mud that tell stories about care and <br /> natural beauty. At MittiMahal, we mix passion and art to bring you simple, unique treasures.</p>
            </div>
               <div className="container">
                <div className="row ">
                    <div className="col-md-6 py-5 " >
                        <h1 className="fs-2 ms-5  py-1 fw-semibold text-center mb-4 text-red-900 bg-slate-200" style={{fontFamily:"serif"}}>From Mud to Masterpiece: Our Artisanal Adventure</h1>
                        <p className="ms-5 text-secondary  fs-5">At MittiMahal, our story is all about passion and creativity. We started with a simple idea: to craft beautiful things from mud. Each piece we create tells a story of artistry and the natural world. We believe in the beauty of handmade, and our journey is all about sharing that beauty with you.</p>
                        <br /><p className="ms-5 text-secondary fs-5">Born from a passion for handmade excellence, our journey unfolds in each meticulously crafted piece, revealing a story of dedication to art, nature, and timeless beauty. Join us in celebrating the artistry that transforms mud into a canvas of elegance.</p>
                    </div>
                    <div className="col-md-6" >
                        <img src="https://media.istockphoto.com/id/1396546412/vector/little-kid-make-pottery-and-feel-happy.jpg?s=612x612&w=0&k=20&c=w-W5m6pSXmGBiT2c-GOxqZM4JNM7AS3JDdHE29DW0Cg=" alt="" />
                    </div>
                </div></div>

            <div className="container">
                <p className="text-center fs-2 fw-bold bg-slate-200 py-1 text-red-900">Why Choose Us</p>
                <div className="row px-5">
                    <div className="col-md-4 py-5">
                        <p className="fs-5 fw-bold text-red-800" style={{ fontFamily: "serif" }}>Handcrafted Excellence</p>
                        <p className="text-muted fs-5 mb-3" style={{ fontFamily: "cooperplate" }}>Immerse yourself in the artistry of handmade creations, where each feedback is carefully crafted with passion and precision.</p>
                        <p className="fs-5 fw-bold text-red-800" style={{ fontFamily: "serif" }}>Nature&apos;s Touch</p>
                        <p className="text-muted fs-5 mb-3" style={{ fontFamily: "cooperplate" }}>Experience the unique beauty of mud-made treasures that bring the warmth and authenticity of the natural world into your home.</p>
                        <p className="fs-5 fw-bold text-red-800" style={{ fontFamily: "serif" }}>Timeless Elegance</p>
                        <p className="text-muted fs-5 mb-3" style={{ fontFamily: "cooperplate" }}>Discover a collection that transcends trends, offering enduring elegance that stands the test of time.</p>
                    </div>
                    <div className="col-md-4 p-5">
                        <img src="https://i.pinimg.com/236x/ee/bf/9e/eebf9e6d50e0a7d4998d6d59a44b6629.jpg" className="w-100" alt="" />
                    </div>
                    <div className="col-md-4 mt-3 py-5">
                    <p className="fs-5 fw-bold text-red-800" style={{ fontFamily: "serif" }}>Sustainability</p>
                        <p className="text-muted fs-5 mb-3" style={{ fontFamily: "cooperplate" }}>Embrace eco-friendly choices with our commitment to sustainable practices, ensuring every creation leaves a positive impact.</p>
                        <p className="fs-5 fw-bold text-red-800" style={{ fontFamily: "serif" }}>Artisanal Stories</p>
                        <p className="text-muted fs-5 mb-3" style={{ fontFamily: "cooperplate" }}>Every piece tells a story – a narrative of creativity, dedication, and a deep connection to the art of crafting.</p>
                        <p className="fs-5 fw-bold text-red-800" style={{ fontFamily: "serif" }}>Customer-Centric Approach</p>
                        <p className="text-muted fs-5 mb-3" style={{ fontFamily: "cooperplate" }}> Enjoy a seamless shopping experience with personalized service, timely deliveries, and a commitment to exceeding your expectations. </p>
                    </div>
                </div>
            </div>

            <div className="container">
            <p className="text-center fs-2 fw-bold bg-slate-200 py-1 text-red-900">Feedback</p>
            <div className="container-fluid ">
        <div className="container">
          <div className="row  ">
            {displayfeedbackData()}
          </div>
        </div>
       <Link to="/Feedback"> <button className="btn btn-danger text-white w-25 m-auto block mt-4">Give Feedback</button>
       </Link>
      </div>

            </div>

            </div>

        </>
    )
}

export default About