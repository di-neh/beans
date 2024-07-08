import './App.css'
import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Beans from "./pages/Beans.tsx";
import Facts from "./pages/Facts.tsx";
import Recipes from "./pages/Recipes.tsx";
import Combination from "./pages/Combination.tsx";
import History from "./pages/History.tsx";
import BeanInfo from "./pages/BeanInfo.tsx";
import RecipeInfo from "./pages/RecipeInfo.tsx";

const App: React.FC = () => {

  return (

          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={< Beans />} />
                  <Route path={"beans/:id"} element={<BeanInfo />} />
                  <Route path="/facts" element={<Facts />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path={"recipes/:id"} element={<RecipeInfo />} />
                  <Route path="/combo" element={<Combination />} />
                  <Route path="/history" element={<History />} />
              </Route>
          </Routes>


  )
}

export default App
