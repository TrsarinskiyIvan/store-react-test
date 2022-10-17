import { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { CATEGORY } from "../../helper/queries";
import Card from "../card/Card";
import './cardContainer.css';
import { Link } from "react-router-dom";
import chooseCourse from "../../helper/chooseCourse";
import CartContext from "../../cartContext";

export class CardContainer extends PureComponent {

    static contextType = CartContext;

    render() {
        return (
            <Query query={CATEGORY} variables={{ input: { title: this.context.selectedCategory } }}>
                {({ data, loading, error }) => {
                    if (loading) return <h2>Loading...</h2>;
                    if (error) return <h2>Error!</h2>;
                    return (
                        <ul className="card-container">
                            {data.category.products.map(i => {
                                return (
                                    <li key={i.id}>
                                        <Link to={`/product/?id=${i.id}`}>
                                            <Card
                                                idProduct={i.id}
                                                title={i.name}
                                                imgUrl={i.gallery[0]}
                                                selectedCourse={this.context.selectedCourse}
                                                price={i.prices[chooseCourse(this.context.selectedCourse)].amount}
                                            />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>);
                }}
            </Query>
        );
    }
}