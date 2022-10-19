import './App.css';
import Header from './components/header/Header';
import { Route, Switch } from "react-router-dom";
import { PureComponent } from 'react';
import QueryProduct from './components/product/QueryProduct';
import Cart from './components/cart/Cart';
import CartContext from './cartContext';
import chooseCourse from './helper/chooseCourse';
import CardContainerWithData from './components/card-container/CardContainerWithData';

class App extends PureComponent {

  static contextType = CartContext;

  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: 'all',
      selectedCourse: '$',
      myBag: [],
      tax: 0.21,
      addToMyBag: this.addToMyBag,
      removeFromMyBag: this.removeFromMyBag,
      selectCourse: this.selectCourse,
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

      tempProduct = { ...p.myBag[foundIndex] };
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
              <QueryProduct />
            </Route>
            <Route path={`/`}>
              <CardContainerWithData />
            </Route>
          </Switch>
        </div >
      </CartContext.Provider>);
  }
}

export default App;
