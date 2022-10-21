import { PureComponent } from "react"
import CartContext from "../../cartContext"
import { CATEGORY } from "../../helper/queries"
import DataProvider from "../data-provider/DataProvider"
import { CardContainer } from "./CardContainer"

export default class CardContainerWithData extends PureComponent {

    static contextType = CartContext

    render() {
        return (
            <DataProvider
                query={CATEGORY}
                variables={{ input: { title: this.context.selectedCategory } }}
                render={data => <CardContainer data={data} />}
            />
        )
    }
}