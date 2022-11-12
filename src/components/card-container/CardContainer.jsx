import './cardContainer.css';
import { PureComponent } from "react";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import chooseCourse from "../../helper/chooseCourse";
import CartContext from "../../cartContext";

export class CardContainer extends PureComponent {

    static contextType = CartContext

    render() {
        return (
            <>
                <h2 className='category-name'>{this.context.selectedCategory}</h2>
                <ul className='card-container'>
                    {this.props.data.category.products.map(i => {
                        return (
                            <li key={i.id}>
                                <Link to={`/product/?id=${i.id}`}>
                                    <Card
                                        inStock={i.inStock}
                                        title={i.name}
                                        brand={i.brand}
                                        imgUrl={i.gallery[0]}
                                        selectedCourse={this.context.selectedCourse}
                                        price={i.prices[chooseCourse(this.context.selectedCourse)].amount}
                                    />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </>)
    }
}