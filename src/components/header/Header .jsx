import './header.css'
import { PureComponent } from "react"
import { NavLink } from "react-router-dom"
import MyBag from '../my-bag/MyBag'
import CartContext from '../../cartContext'
import CourseMenuWithData from '../course-menu/CourseMenuWithData'

export default class HeaderC extends PureComponent {

    static contextType = CartContext;

    state = {
        showCourseMenu: false,
        showMyBag: false,
    }

    showBag = () => {
        this.setState(p => ({ ...p, showMyBag: !p.showMyBag }))
    }

    render() {
        return (
            <header className='header'>
                <nav className='navigation'>
                    <ul className='navigation__list'>{this.props.data.categories.map((item) => (
                        <li className='navigation__list__item' key={item.name}>
                            <NavLink
                                id={item.name}
                                className='navigation__list__item__link'
                                activeClassName="active-link"
                                to={`/${item.name}`}
                                onClick={e => { this.context.selectCategory(e.target.id) }}
                            >
                                {item.name}
                            </NavLink>
                        </li>))}
                    </ul>
                </nav>
                <img className='header__logo' src='./logo.png' alt='Logo store' />
                <div className='right-side'>
                    <button id='id-btn-course' className='right-side__btn-course' onClick={(e) => {
                        this.setState(p => ({ ...p, showCourseMenu: !p.showCourseMenu }))
                    }}>
                        <span>{this.context.selectedCourse}</span>
                        <img
                            className='right-side__btn-course__img'
                            src='./course.png'
                            alt='course picker' />
                    </button>
                    <button className='right-side__btn-cart'
                        onClick={() => { this.setState(p => ({ ...p, showMyBag: !p.showMyBag })) }}>
                        <img className='right-side__btn-cart__img' src='./cart.png' alt='cart' />
                    </button>
                </div>
                {this.state.showCourseMenu && <div className='currencies-menu'>
                    <CourseMenuWithData />
                </div>}
                {this.state.showMyBag && <MyBag showBag={this.showBag} />}
                {this.context.myBag.length !== 0 && <div className='product-counter'>{this.context.totalProducts().sum}</div>}
            </header>)
    }
}