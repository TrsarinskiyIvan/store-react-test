import { PureComponent } from "react";
import CartContext from "../../cartContext";
import chooseCourse from "../../helper/chooseCourse";
import ProductMini from "../product-mini/ProductMini";
import './cart.css';

export default class Cart extends PureComponent {

    static contextType = CartContext;

    render() {
        return (
            <div className='my-bag my-cart'>
                {this.context.myBag.length > 0 ? <div>
                    <h2 className="cart">Cart</h2>
                    <ul className="products-mini">
                        {this.context.myBag.map(i => (
                            <li key={i.product.idProduct} className="poduct-item">
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
                    <div className="order-block">
                        <p className="tax">Tax: {100 * this.context.tax}% <span>{this.context.selectedCourse}{(this.context.tax * this.context.totalProducts().price).toFixed(2)}</span></p>
                        <p className="quantity">Quantity: <span>{this.context.totalProducts().sum}</span></p>
                        <p className="total">Total: <span>{this.context.selectedCourse}{((1 - this.context.tax) * this.context.totalProducts().price).toFixed(2)}</span></p>
                        <button className="order-btn">order</button>
                    </div>
                </div> : <div className="empthy-cart">The cart is empty</div>}
            </div>)
    }
} 