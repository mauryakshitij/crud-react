import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Crud from "./crud";
import "./App.css";
import Update from "./crud/Update";


function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Switch>
          <Route exact path="/" component={Crud} />
          <Route exact path="/update/:id/" component={Update} />
        </Switch>
    </div>
  );
}

export default App;
