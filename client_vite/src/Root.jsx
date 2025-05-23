import { Outlet } from "react-router";
import { NavBar, Footer } from './Components.jsx'

function Root(props) {

  return (
    <>
      <NavBar lang={props.language} handleLang={props.handleLang} text={props.text}></NavBar>
      <Outlet />
      <Footer text={props.text}></Footer>
    </>
  )

}

export default Root;