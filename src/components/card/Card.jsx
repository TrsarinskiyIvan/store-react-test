import './card.css'
import { PureComponent } from "react"

export default class Card extends PureComponent {

    render() {
        return (
            <div className='card'>
                {!this.props.inStock && <h3 className='card__sold'>SOLD</h3>}
                <img className="card__pic" src={this.props.imgUrl} alt={this.props.title} />
                <h2 className='card__brand'>{this.props.brand}</h2>
                <h2 className="card__title">{this.props.title}</h2>
                <p className="card__price">{this.props.selectedCourse}&nbsp;{(this.props.price).toFixed(2)}</p>
                <div className="card__to-cart-block"><img src="./to-cart.png" alt="" /></div>
            </div>
        )
    }
}