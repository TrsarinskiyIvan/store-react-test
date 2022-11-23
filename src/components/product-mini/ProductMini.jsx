import { PureComponent } from "react"
import CartContext from "../../cartContext"
import './product-mini.css'

export default class ProductMini extends PureComponent {

    static contextType = CartContext

    state = {
        gallery: this.props.gallery,
        currentImageIndex: 0
    }

    render() {

        return (
            <div className="product-mini">
                <div>
                    <h2 className="product-mini__name">{this.props.name}</h2>
                    <p className="product-mini__brand">{this.props.brand}</p>
                    <p className="product-mini__price">{this.props.symbol}{this.props.price.toFixed(2)}</p>
                    <ul className="mini-attributes">
                        {this.props.attributes.map(attribute => (
                            <li key={attribute.id}>
                                <p className="mini-attribute-name">{attribute.name}</p>
                                {attribute.name === 'Color' ?
                                    <ul className="mini-attribute-param">{attribute.items.map(item => (
                                        <li
                                            key={item.id}
                                            className={`color-attribute ${this.props.selectedAttributes[`${attribute.id}`] === item.id && ' color-attribute_selected'}`}
                                            style={{ backgroundColor: item.value }}
                                        />))}
                                    </ul> :
                                    <ul className="mini-attribute-param">{attribute.items.map(item => (
                                        <li
                                            key={item.id}
                                            className={`mini-attribute-param__item ${this.props.selectedAttributes[`${attribute.id}`] === item.id && 'selected-attribute'}`}>
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
                            const product = {
                                product: this.props,
                                attributes: this.props.selectedAttributes
                            }
                            this.context.addToMyBag(product)
                        }}>+</button>
                        <span>{this.props.quantity}</span>
                        <button onClick={() => {
                            const product = {
                                product: this.props,
                                attributes: this.props.selectedAttributes
                            }
                            this.context.removeFromMyBag(product)
                        }}>-</button>
                    </div>
                    <div className="mini-img-container">
                        <img src={this.state.gallery[this.state.currentImageIndex]} alt="gallery" />
                        {this.props.showImgNavigation && <><button
                            className="image-navigation-btn left-btn"
                            onClick={() => {
                                this.setState(p => ({
                                    ...p,
                                    currentImageIndex: (p.currentImageIndex + this.state.gallery.length - 1) % this.state.gallery.length
                                }))
                            }} />
                            <button
                                className="image-navigation-btn right-btn"
                                onClick={() => {
                                    this.setState(p => ({ ...p, currentImageIndex: (p.currentImageIndex + 1) % this.state.gallery.length }))
                                }} /></>}
                    </div>
                </div>
            </div>)
    }
} 