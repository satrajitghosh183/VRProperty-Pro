import React from 'react'

const Signup = () => {
  return (
    <>
     <div className ='w-full text-black'  style={{display:'flex',flexDirection:'column',justifyContent: 'center',height:'800px'}}>
    <form className='w-1/3 p-16 mt-24 rounded-2xl' style={{border:'2px solid black', marginLeft:'450px'}}>
    <h1 className='text-3xl pb-6'>Signup</h1>
    <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Full Name</label>
    <input type="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp"/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="password" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary bg-slate-700 text-white" >Submit</button>
</form>
<div style={{marginLeft:'550px', marginTop:'13px'}}>
    {/* Already have an account?<Link to={'/login'}>signin</Link> */}
</div>
{/* <Link to={'/'} style={{marginLeft:'650px', marginTop:'13px'}}>Home</Link> */}
</div>
    </>
  )
}

export default Signup