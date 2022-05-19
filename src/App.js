import "./App.css";
import LoginPage from "./pages/LoginPage"
import ToolPage from "./pages/ToolPage"
import RegisterPage from "./pages/RegisterPage"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import SlateTranscriptEditorPage from "./pages/SlateTranscriptEditorPage";
import ExternLoginPage from './pages/ExternLoginPage'
import AdminPage from "./pages/AdminPage";
import SlateTranscriptEditorPageListener from "./pages/SlateTranscriptEditorPageListenerMode";
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path={"/"}>
             <ToolPage></ToolPage>
          </Route> 
          
          <Route exact path={"/editor"}>
             <SlateTranscriptEditorPage></SlateTranscriptEditorPage>
          </Route>
         <Route exact path={"/listener"}>
            <SlateTranscriptEditorPageListener></SlateTranscriptEditorPageListener>
         </Route>
          <Route exact path={"/login"}>
             <LoginPage></LoginPage>
          </Route>   
          <Route exact path={"/register"}>
             <RegisterPage></RegisterPage>
          </Route>     
          <Route exact path={"/router"}>
             <ExternLoginPage></ExternLoginPage>
          </Route> 
         <Route exact path={"/adminpage"}>
               <AdminPage></AdminPage>
            </Route>
          
        </Switch>
    </Router>
  );
}

export default App;
