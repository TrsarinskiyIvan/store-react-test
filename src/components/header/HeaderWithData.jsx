import { PureComponent } from "react";
import { CATEGORIES } from "../../helper/queries";
import DataProvider from "../data-provider/DataProvider";
import Header from "./Header ";

export default class HeaderWithData extends PureComponent {
    render() {
        return (
            <DataProvider
                query={CATEGORIES}
                render={data => <Header data={data} />}
            />
        )
    }
}