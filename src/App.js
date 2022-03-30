import Header from "./components/Header";
import Items from "./components/Items";
import Cart from "./components/Cart";
import { useSelector } from 'react-redux'

function App() {
  const amount = useSelector((state) => state.amount)

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row ">
          <div className="col-lg-8 col-md-12 col-sm-12 mb-5">
            <div className="container-xl shadow-lg rounded p-4">
              <h4 className="fw-bold p-2 mb-4">Cart ({amount.cartAmount.length} items)</h4>
              <Items cartItem={amount.cartAmount}/>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 mb-4">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
