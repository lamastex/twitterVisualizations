import "./App.css";
import Tree from "./componants/Tree";
import Header from "./componants/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Graph2 from "./componants/Graph2";

function App() {
  return (
    <div className="min-h-screen bg-gray-70 min-w-screen">
      <div className="bg-gray-70 w-full h-full">
        <div className="flex flex-col space-y-5 md:space-y-32 ">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Graph2 />
              </Route>
              <Route path="/Tree">
                <Tree />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
