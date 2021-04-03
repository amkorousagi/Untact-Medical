import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

const whereState = atom({
  key: "where",
  default: "home",
})

const loginState = atom({
  key: "login",
  default: false,
})

const isDoctorState = atom({
  key: "isDoctor",
  default: false,
})

const isDashState = atom({
  key: "isDash",
  default: false,
})
const currentIdState = atom({
  key: "id",
  default: 0,
})
const historyState = atom({
  key:"history",
  default: undefined,
})
export { whereState, loginState, isDoctorState, isDashState, currentIdState, historyState }
