import { Query } from "@apollo/client/react/components";
import { PureComponent } from "react";
import CartContext from "../../cartContext";
import chooseCourse from "../../helper/chooseCourse";
import { PRODUCT } from "../../helper/queries";
import Product from "./Product";

export default class QueryProduct extends PureComponent {

    static contextType = CartContext;

    render() {

        const querryParams = new URLSearchParams(window.location.search);
        const id = querryParams.get('id');

        return (
            <Query query={PRODUCT} variables={{ id }}>
                {({ data, loading, error }) => {
                    if (error) return <h2>Error!</h2>
                    if (loading) return <h2>Loading...</h2>

                    let node = document.createElement('div')
                    node.innerHTML = data.product.description

                    let description = data.product.description

                    console.log(node.childNodes)

                    node.childNodes.forEach(e => {
                        console.log(e.innerHTML)
                    })


                    return (
                        <Product
                            idProduct={data.product.id}
                            name={data.product.name}
                            brand={data.product.brand}
                            gallery={data.product.gallery}
                            description={description}
                            attributes={data.product.attributes}
                            price={data.product.prices[chooseCourse(this.context.selectedCourse)].amount}
                            prices={data.product.prices}
                            selectedCourse={this.props.selectedCourse}
                            inStock={data.product.inStock}
                        />)
                }}
            </Query>)
    }
}