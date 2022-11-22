import './reset.css'
import './App.css'
import { Route, Switch } from "react-router-dom"
import { PureComponent } from 'react'
import QueryProduct from './components/product/QueryProduct'
import Cart from './components/cart/Cart'
import CartContext from './cartContext'
import chooseCourse from './helper/chooseCourse'
import CardContainerWithData from './components/card-container/CardContainerWithData'
import HeaderWithData from './components/header/HeaderWithData'

class App extends PureComponent {

  static contextType = CartContext

  constructor(props) {
    super(props)

    this.state = {
      selectedCategory: 'all',
      selectedCourse: localStorage.getItem('selectedCourse') || '$',
      myBag: JSON.parse(localStorage.getItem('myBag')) || [],
      tax: 0.21,
      showCourse: false,
      showMyBag: false,
      addToMyBag: this.addToMyBag,
      removeFromMyBag: this.removeFromMyBag,
      selectCourse: this.selectCourse,
      selectCategory: this.selectCategory,
      totalProducts: this.totalProducts || { sum: 0, price: 0 },
      showCourseMenu: this.showCourseMenu,
      showMyBagMenu: this.showMyBagMenu
    }
  }


  showCourseMenu = () => {
    this.setState(p => ({ ...p, showCourse: !p.showCourse }))
  }
  showMyBagMenu = () => {
    this.setState(p => ({ ...p, showMyBag: !p.showMyBag }))
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

      let tmpBag = [...p.myBag]

      let foundIndex = tmpBag.findIndex(i => {
        return ((i.product.idProduct === product.product.idProduct)
          && (JSON.stringify(i.attributes) === JSON.stringify(product.attributes)))
      })

      const tmpProduct = { ...tmpBag[foundIndex] }

      tmpProduct.quantity--

      if (tmpProduct.quantity === 0) {
        tmpBag.splice(foundIndex, 1)
      } else {
        tmpBag[foundIndex] = tmpProduct
      }

      return { ...p, myBag: tmpBag }

    })
  }

  addToMyBag = (product) => {

    this.setState(p => {

      let foundIndex = p.myBag.findIndex(i => {
        return ((i.product.idProduct === product.product.idProduct)
          && (JSON.stringify(i.attributes) === JSON.stringify(product.attributes)))
      })

      let tempProduct
      let tempBag

      if (foundIndex !== -1) {

        tempProduct = p.myBag[foundIndex]

        tempProduct.quantity++
        tempBag = [...p.myBag]
        tempBag[foundIndex] = tempProduct

        return {
          ...p,
          myBag: tempBag
        }

      } else return {
        ...p,
        myBag: [...p.myBag, product]
      }
    })

  }

  selectCategory = (category) => {
    this.setState(p => ({ ...p, selectedCategory: category }))
  }

  selectCourse = (symbol) => {
    this.setState(p => ({ ...p, selectedCourse: symbol }))
  }

  render() {

    localStorage.setItem('selectedCourse', this.state.selectedCourse)
    localStorage.setItem('myBag', JSON.stringify(this.state.myBag))

    document.getElementById('root').addEventListener('click', e => {
      if (this.state.showCourse && e.target.id !== 'id-btn-course') this.showCourseMenu()
    })


    return (
      <CartContext.Provider value={this.state}>
        <div className='App'>
          <HeaderWithData />
          <div className="main-wrapper">
            {this.state.showMyBag && <div onClick={() => this.showMyBagMenu()} className='screen-saver'></div>}
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
          </div>
        </div >
      </CartContext.Provider>)
  }
}

export default App