import { PureComponent } from "react";
import CartContext from "../../cartContext";

export default class CourseMenu extends PureComponent {

    static contextType = CartContext

    render() {
        return (
            <ul className='currencies__list'>
                {this.props.data.currencies.map(item => {
                    return (
                        <li
                            id={item.symbol}
                            className='currencies__list_item'
                            key={item.label}
                            onClick={(e) => {
                                this.context.selectCourse(e.target.id)
                                this.context.showCourseMenu()
                            }}>
                            {item.symbol}&nbsp;{item.label}
                        </li>
                    )
                })}
            </ul>)
    }
}