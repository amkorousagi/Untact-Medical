import React from "react"
import { Route } from "react-router-dom"
import Home from "../Home"
import Join from "../Join"
import Login from "../Login"
import Reader from "../Reader"
import Readout from "../Readout"
import Requester from "../Requester"
import Result from "../Result"
import Request from "../Request"
import RequestDicom from "../RequestDicom"

const Router = () => {
  return (
    <>
      <Route path='/' component={Home} exact />
      <Route path='/join' component={Join} />
      <Route path='/login' component={Login} />
      <Route path='/reader' component={Reader} exact />
      <Route path="/reader/readout" component={Readout} />
      <Route path="/requester" component={Requester} exact />
      <Route path="/requester/result" component={Result} /> 
      <Route path="/requester/request" component={Request} />
      <Route path="/requester/request_dicom" component={RequestDicom} />
    </>
  )
}

export default Router