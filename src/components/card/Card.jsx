import { PureComponent } from "react";
import './card.css';

export default class Card extends PureComponent {

    render() {
        return (
            <div className="card">
                <img className="card__pic" src={this.props.imgUrl} alt={this.props.title} />
                <h2 className="card__title">{this.props.title}</h2>
                <p className="card__price">{this.props.selectedCourse}&nbsp;{this.props.price}</p>
                <div className="card__to-cart-block"><img src="./to-cart.png" alt="" /></div>
            </div>
        );
    }
}