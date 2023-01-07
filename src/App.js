import React, {Suspense} from "react";
import { Route, Routes } from "react-router-dom";

const Form = React.lazy(()=>import("./pages/Form"))
const Home = React.lazy(()=>import("./pages/Home"))
const Preview = React.lazy(()=>import("./pages/Preview"))

function App() {
  return (
    <Suspense>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<Form />}/>
          <Route path="/preview/:id" element={<Preview />}/>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
