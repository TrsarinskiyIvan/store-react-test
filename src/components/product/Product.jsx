import { PureComponent } from "react"
import './product.css'
import CartContext from "../../cartContext"
import chooseCourse from "../../helper/chooseCourse";

export default class Product extends PureComponent {

    static contextType = CartContext;

    state = {
        selectedImage: this.props.data.product.gallery[0],
        selectedAttributes: { attributeDefault: 'none' }
    }

    render() {
        return (
            <div className="product">
                <div className="image-block">
                    <img className="product-image" src={this.state.selectedImage} alt="" />
                    <ul className="list-mini-images">
                        {this.props.data.product.gallery.map((i, index) => (<li className="mini-image" key={index}>
                            <img onClick={event => this.setState({ selectedImage: event.target.src })} className="product-image-mini" src={i} alt="" /></li>))}
                    </ul>
                </div>
                <div className="info">
                    <h2 className="product-brand">{this.props.data.product.brand}</h2>
                    <p className="product-title">{this.props.data.product.name}</p>
                    <p className="price">PRICE:</p>
                    <p className="amount">{this.context.selectedCourse}{this.props.data.product.prices[chooseCourse(this.context.selectedCourse)].amount.toFixed(2)}</p>
                    <ul className="attributes">
                        {this.props.data.product.attributes.map(attribute => (
                            <li key={attribute.id}>
                                <p className="attribute-name">{attribute.name}</p>
                                {attribute.name === 'Color' ?
                                    <ul className="attribute-param">{attribute.items.map(item => (
                                        <li
                                            key={item.id}
                                            className={`color-attribute ${this.state.selectedAttributes[`${attribute.id}`] === item.id && ' color-attribute_selected'}`}
                                            style={{ backgroundColor: item.value }}
                                            onClick={() => {
                                                this.setState(p => {
                                                    return { ...p, selectedAttributes: { ...p.selectedAttributes, [`${attribute.id}`]: `${item.id}` } }
                                                })
                                            }}
                                        />))}
                                    </ul> :
                                    <ul className="attribute-param">{attribute.items.map(item => (
                                        <li
                                            key={item.id}
                                            className={`attribute-param__item ${this.state.selectedAttributes[`${attribute.id}`] === item.id && 'selected-attribute'}`}
                                            onClick={() => {
                                                this.setState(p => {
                                                    return { ...p, selectedAttributes: { ...p.selectedAttributes, [`${attribute.id}`]: `${item.id}` } }
                                                })
                                            }}>
                                            {item.value}
                                        </li>))}
                                    </ul>}
                            </li>
                        )
                        )}
                    </ul>
                    <button
                        onClick={() => {
                            if (this.props.data.product.inStock) {

                                const product = {
                                    product: this.props.data.product,
                                    attributes: this.state.selectedAttributes,
                                    quantity: 1
                                }

                                this.context.addToMyBag(product);
                            }
                        }}
                        className={`add-to-cart-btn ${!this.props.data.product.inStock && 'is-stock'}`}>ADD TO CART
                    </button>
                    <p className="description" dangerouslySetInnerHTML={{ __html: this.props.data.product.description }} />
                </div>
            </div>
        )
    }
}
