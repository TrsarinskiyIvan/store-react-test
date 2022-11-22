import './card.css'
import { PureComponent } from "react"
import CartContext from "../../cartContext"

export default class Card extends PureComponent {

    static contextType = CartContext;

    render() {
        return (
            <div className='card'>
                {!this.props.inStock && <h3 className='card__sold'>SOLD</h3>}
                <img className="card__pic" src={this.props.imgUrl} alt={this.props.title} />
                <h2 className='card__brand'>{this.props.brand}</h2>
                <h2 className="card__title">{this.props.name}</h2>
                <p className="card__price">{this.props.selectedCourse}&nbsp;{(this.props.price).toFixed(2)}</p>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        if (this.props.inStock) {
                            this.context.addToMyBag({
                                product: this.props,
                                attributes: { attributeDefault: 'none' },
                                quantity: 1
                            })
                        }
                    }}
                    className={`card__to-cart-block ${!this.props.inStock && 'in-stock'}`}>
                    <img src="./to-cart.png" alt="" />
                </button>
            </div>
        )
    }
}