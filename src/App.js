import RegisterProfile from "./registerprofile";
import CreateBlog from "./components/Createblog";
import Homepage from "./components/Homepage";
import Blogdetails from "./components/Blogdetails";
import UpdateBlog from "./components/Updateblog";
import Moviehome from "./components/Moviehome";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './styling/app.css';
import {GlobalProvider} from "./context/GlobalState";
import 'font-awesome/css/font-awesome.min.css';

function App() {
  
  return (
    <GlobalProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path='/signup' component={RegisterProfile} />
            <Route path='/createblog' component={CreateBlog} /> 
            <Route path='/homepage' component={Homepage} /> 
            <Route path='/blogdetails' component={Blogdetails} /> 
            <Route path='/updateblog' component={UpdateBlog} />
            <Route path='/moviehome' component={Moviehome} />
            <Route path='/watchlist' component={Watchlist} />
            <Route path='/watched' component={Watched} />
          </Switch>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
