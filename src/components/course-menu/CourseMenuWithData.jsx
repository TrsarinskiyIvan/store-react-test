import { PureComponent } from "react"
import DataProvider from "../data-provider/DataProvider"
import { CURRENCIES } from '../../helper/queries'
import CourseMenu from "./CourseMenu"

export default class CourseMenuWithData extends PureComponent {
    render() {
        return <DataProvider
            query={CURRENCIES}
            render={data => <CourseMenu data={data} />}
        />
    }
}