import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav"
import Home from "./Home"
import {
  Route,
  Link,
  BrowserRouter,
  Switch,
  useHistory,
} from "react-router-dom"

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import CanvasDraw from "react-canvas-draw"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import {
  isDoctorState,
  isDashState,
  currentIdState,
  historyState,
} from "./state"
import DataTable from "./DataTable"
import RequestTable from "./RequestTable"
import RequestedTable from "./RequestedTable"
import ReceivedTable from "./ReceivedTable"
import SendedTable from "./SendedTable"
import { useEffect } from "react"
// use history, if not state is not stayed.

const Received = () => {
  return (
    <div>
      <DoctorSide />
      <ReceivedTable />
    </div>
  )
}
const Sended = () => {
  return (
    <div>
      <DoctorSide />
      <SendedTable />
    </div>
  )
}

const DoctorSide = (props) => {
  return (
    <SideNav
      onSelect={(selected) => {
        // Add your code here
      }}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected='home'>
        <NavItem eventKey='home'>
          <NavIcon>
            <i className='fa fa-fw fa-home' style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to='/dash'>Home</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey='home'>
          <NavIcon>
            <i className='fa fa-fw fa-home' style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to='/dash/received'>받은 작업</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey='home'>
          <NavIcon>
            <i className='fa fa-fw fa-home' style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to='/dash/sended'>보낸 작업</Link>
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  )
}

const NonDoctorSide = () => {
  return (
    <SideNav
      onSelect={(selected) => {
        // Add your code here
      }}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected='home'>
        <NavItem eventKey='home'>
          <NavIcon>
            <i className='fa fa-fw fa-home' style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to='/dash'>Home</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey='home'>
          <NavIcon>
            <i className='fa fa-fw fa-home' style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to='/dash/request'>작업 요청하기</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey='home'>
          <NavIcon>
            <i className='fa fa-fw fa-home' style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to='/dash/requested'>요청한 작업 보기</Link>
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  )
}

const DoctorContent = (props) => {
  return (
    <div>
      <DoctorSide />
      <CanvasDraw />
    </div>
  )
}

const NonDoctorContent = (props) => {
  return (
    <div>
      <NonDoctorSide />
      <DataTable />
    </div>
  )
}

const Helper = () => {
  const [isDoctor, setIsDoctor] = useRecoilState(isDoctorState)
  return (
    <div>
      {isDoctor ? <DoctorSide /> : <NonDoctorSide />}
      <Home />
      <button
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "5px",
          right: 40,
          bottom: 40,
        }}
        onClick={(e) => {
          setIsDoctor(!isDoctor)
        }}>
        dev switch user
      </button>
    </div>
  )
}

const Request = () => {
  return (
    <div>
      <NonDoctorSide />
      <RequestTable />
    </div>
  )
}
const Requested = () => {
  return (
    <div>
      <DoctorSide />
      <RequestedTable />
    </div>
  )
}
const Canvas = () => {
  const [currentId, setCurrentid] = useRecoilState(currentIdState)
  return (
    <div>
      <p>i'm {currentId}</p>
      <DoctorSide />
      <CanvasDraw />
    </div>
  )
}
const Content = () => {
  return (
    <div>
      <Route path='/dash' exact component={Helper}></Route>
      <Route path='/dash/request' component={Request}></Route>
      <Route path='/dash/requested' component={Requested}></Route>
      <Route path='/dash/received' exact component={Received}></Route>
      <Route path='/dash/received/job' exact component={Canvas}></Route>
      <Route path='/dash/sended' component={Sended}></Route>
    </div>
  )
}

const Dash = (props) => {
  const [isDash, setIsDash] = useRecoilState(isDashState)
  const [history, setHistory] = useRecoilState(historyState)
  const _history = useHistory()
  useEffect(() => {
    setIsDash(true)
    setHistory(_history)
  })

  console.log("match", props.match)
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Content />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Dash
/*
<NavItem eventKey='charts'>
            <NavIcon>
              <i
                className='fa fa-fw fa-line-chart'
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Charts</NavText>
            <NavItem eventKey='charts/linechart'>
              <NavText>Line Chart</NavText>
            </NavItem>
            <NavItem eventKey='charts/barchart'>
              <NavText>Bar Chart</NavText>
            </NavItem>
          </NavItem>
*/
