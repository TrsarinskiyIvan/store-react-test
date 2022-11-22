import './myBag.css'
import { PureComponent } from "react"
import ProductMini from "../product-mini/ProductMini"
import CartContext from "../../cartContext"
import chooseCourse from "../../helper/chooseCourse"
import { Link } from "react-router-dom"

export default class MyBag extends PureComponent {

    static contextType = CartContext

    render() {
        return (
            <div className='my-bag'>
                <h2>My bag  {this.context.totalProducts().sum} item{this.context.totalProducts().sum !== 1 && 's'}</h2>
                <ul className="products-mini">
                    {this.context.myBag.map((i, index) => (
                        <li key={index}>
                            <ProductMini
                                name={i.product.name}
                                brand={i.product.brand}
                                price={i.product.prices[chooseCourse(this.context.selectedCourse)].amount}
                                symbol={this.context.selectedCourse}
                                attributes={i.product.attributes}
                                gallery={i.product.gallery}
                                quantity={i.quantity}
                                idProduct={i.product.idProduct}
                                selectedAttributes={i.attributes}
                            />
                        </li>))
                    }
                </ul>
                {this.context.totalProducts().sum > 0 && <div>
                    <div className="total-price">
                        <span>Total:</span>
                        <span>{this.context.selectedCourse}{this.context.totalProducts().price.toFixed(2)}</span>
                    </div>
                    <div className="order-block-buttons">
                        <Link to='/cart' onClick={() => {
                            this.props.showBag()
                        }}>VIEW CART</Link>
                        <Link to="" style={{ backgroundColor: '#5ECE7B', border: 'none', color: '#fff' }}>CHECK OUT</Link>
                    </div>
                </div>
                }
            </div>)
    }
}