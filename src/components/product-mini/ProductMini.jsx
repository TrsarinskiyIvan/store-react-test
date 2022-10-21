import { PureComponent } from "react"
import CartContext from "../../cartContext"
import './product-mini.css'

export default class ProductMini extends PureComponent {

    static contextType = CartContext;

    state = {
        selectedImage: this.props.gallery[0],
        selectedAttributes: this.props.selectedAttributes
    }

    render() {
        return (
            <div className="product-mini">
                <div>
                    <h2 className="product-mini__name">{this.props.name}</h2>
                    <p className="product-mini__brand">{this.props.brand}</p>
                    <p className="product-mini__price">{this.props.symbol}{this.props.price}</p>
                    <ul className="mini-attributes">
                        {this.props.attributes.map(attribute => (
                            <li key={attribute.id}>
                                <p className="mini-attribute-name">{attribute.name}</p>
                                {attribute.name === 'Color' ?
                                    <ul className="mini-attribute-param">{attribute.items.map(item => (
                                        <li
                                            key={item.id}
                                            className={`color-attribute ${this.state.selectedAttributes[`${attribute.id}`] === item.id && ' color-attribute_selected'}`}
                                            style={{ backgroundColor: item.value }}

                                        />))}
                                    </ul> :
                                    <ul className="mini-attribute-param">{attribute.items.map(item => (
                                        <li
                                            key={item.id}
                                            className={`mini-attribute-param__item ${this.state.selectedAttributes[`${attribute.id}`] === item.id && 'selected-attribute'}`}>
                                            {item.value}
                                        </li>))}
                                    </ul>}
                            </li>
                        )
                        )}
                    </ul>
                </div>
                <div className="img-btn-container">
                    <div className="buttons-menu">
                        <button onClick={() => {
                            this.context.addToMyBag({ product: { idProduct: this.props.idProduct } })
                        }}>+</button>
                        <span>{this.props.quantity}</span>
                        <button onClick={() => { this.context.removeFromMyBag({ product: { idProduct: this.props.idProduct } }) }}>-</button>
                    </div>
                    <div className="mini-img-container">
                        <img src={this.props.gallery[0]} alt="gallery" />
                    </div>
                </div>
            </div>)
    }
} 