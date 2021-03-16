import logo from "./cloud.png"
import "./App.css"

import { Route, Link, BrowserRouter, Switch } from "react-router-dom"

import Join from "./Join"
import Login from "./Login"
import Home from "./Home"

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <BrowserRouter>
          <h1>원격 판독 서비스 Project2!</h1>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/join' component={Join} />
            <Route path='/login' component={Login} />
          </Switch>
          <div className='header'>
            <p>
              <Link to='/'>Home</Link>
            </p>
            <p>
              아직 회원이 아니신가요? <Link to='/join'>회원가입</Link>
            </p>
            <p>
              또는 <Link to='/login'>로그인</Link>
            </p>
          </div>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App
