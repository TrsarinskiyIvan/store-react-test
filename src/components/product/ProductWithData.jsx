import { PureComponent } from "react"
import { PRODUCT } from "../../helper/queries"
import DataProvider from "../data-provider/DataProvider"
import Product from "./Product"

export default class ProductWithData extends PureComponent {
    render() {

        const querryParams = new URLSearchParams(window.location.search)
        const id = querryParams.get('id')

        return <DataProvider
            query={PRODUCT} variables={{ id }}
            render={data => <Product data={data} />}
        />
    }
}