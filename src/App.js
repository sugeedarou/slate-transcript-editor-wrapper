import "./App.css";
import LoginPage from "./pages/LoginPage"
import ToolPage from "./pages/ToolPage"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path={"/"}>
             <ToolPage></ToolPage>
          </Route>        
        </Switch>
    </Router>
  );
}

export default App;
