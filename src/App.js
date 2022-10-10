import './App.css';
import Header from './components/header/Header';
import { Route, Switch } from "react-router-dom";
import { CardContainer } from './components/card-container/CardContainer';
import { PureComponent } from 'react';
import QueryProduct from './components/product/QueryProduct';
import Cart from './components/cart/Cart';
import CartContext from './cartContext';
import chooseCourse from './helper/chooseCourse';

class App extends PureComponent {

  static contextType = CartContext;

  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 'all',
      selectedCourse: '$',
      selectedProduct: '',
      myBag: [],
      tax: 0.1,
      addToMyBag: this.addToMyBag,
      removeFromMyBag: this.removeFromMyBag,
      selectCourse: this.selectCourse,
      selectProduct: this.selectProduct,
      selectCategory: this.selectCategory,
      totalProducts: this.totalProducts
    }
  }

  totalProducts = () => {

    let sum = 0;
    let price = 0;

    this.state.myBag.forEach(e => {
      sum += e.quantity;
      price += e.product.prices[chooseCourse(this.state.selectedCourse)].amount * e.quantity;
    });

    return { sum, price };

  }

  removeFromMyBag = (product) => {

    this.setState(p => {

      let foundIndex = p.myBag.findIndex(e => {
        return product.product.idProduct === e.product.idProduct;
      });

      let tempProduct;
      let tempBag;

      tempProduct = p.myBag[foundIndex];
      tempProduct.quantity--;

      tempBag = [...p.myBag];

      if (tempProduct.quantity === 0) {
        tempBag.splice(foundIndex, 1);
      } else {
        tempBag[foundIndex] = tempProduct;
      }

      return {
        ...p,
        myBag: tempBag
      }

    });

  }

  addToMyBag = (product) => {

    this.setState(p => {

      let foundIndex = p.myBag.findIndex(e => {
        return product.product.idProduct === e.product.idProduct;
      });

      let tempProduct;
      let tempBag;

      if (foundIndex !== -1) {
        tempProduct = p.myBag[foundIndex];
        tempProduct.quantity++;
        tempBag = [...p.myBag];

        tempBag[foundIndex] = tempProduct;

        return {
          ...p,
          myBag: tempBag
        }

      } else return {
        ...p,
        myBag: [...p.myBag, product]
      };
    });
  }

  selectCategory = (category) => {
    this.setState(p => ({ ...p, selectedCategory: category }));
  }

  selectCourse = (symbol) => {
    this.setState(p => ({ ...p, selectedCourse: symbol }));
  }

  selectProduct = (idProduct) => {
    this.setState(p => ({ ...p, selectedProduct: idProduct }));

  }

  render() {
    return (
      <CartContext.Provider value={this.state}>
        <div className='App' >
          <Header />
          <Switch>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/product'>
              <QueryProduct
                idProduct={this.state.selectedProduct}
              />
            </Route>
            <Route path={`/`}>
              <CardContainer />
            </Route>
          </Switch>
        </div >
      </CartContext.Provider>);
  }
}

export default App;
