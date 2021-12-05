import "./App.css";
import NewsFeed from "./Newsfeed";
import Stats from "./Stats";
import { ContextProvider } from "./context/StockContext";

function App() {
  return (
    <ContextProvider>
      <div className="app">
        <div className="app__body">
          <div className="app__container">
            <NewsFeed />
            <Stats />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
