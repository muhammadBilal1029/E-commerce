import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
function Loader() {
  return (
    // <div>
    //         <BallTriangle
    // height={100}
    // width={100}
    // radius={5}
    // color="#4fa94d"
    // ariaLabel="ball-triangle-loading"
    // wrapperStyle={{}}
    // wrapperClass=""
    // visible={true}
    // />
    // </div>
    <div className="loader">
    {/* <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    /> */}
      <div className='spinner'></div>
    {/* <div className="spinner"></div> */}
  </div>
  )
}

export default Loader