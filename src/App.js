import "./App.css";
import Topbar from "./Topbar";
import Body from "./Body";
import Stats from "./Stats";
import News from "./News";
import Footer from "./Footer";
function App() {
  return (
    <div className="App">
      <Topbar />
      <Body />
      <Stats />
      <News />
      <Footer />
    </div>
  );
}

export default App;
