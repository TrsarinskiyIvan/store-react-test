import './header.css'
import logoImg from './logo.png'
import { PureComponent } from "react"
import { NavLink } from "react-router-dom"
import MyBag from '../my-bag/MyBag'
import CartContext from '../../cartContext'
import CourseMenuWithData from '../course-menu/CourseMenuWithData'

export default class HeaderC extends PureComponent {

    static contextType = CartContext

    render() {
        return (
            <header className='header'>
                <nav className='navigation'>
                    <ul className='navigation__list'>{this.props.data.categories.map(item => (
                        <li className='navigation__list__item' key={item.name}>
                            <NavLink
                                id={item.name}
                                className='navigation__list__item__link'
                                activeClassName="active-link"
                                to={`/${item.name}`}
                                onClick={e => {
                                    this.context.selectCategory(e.target.id)
                                    if (this.context.showMyBag) this.context.showMyBagMenu()
                                }}
                            >
                                {item.name}
                            </NavLink>
                        </li>))}
                    </ul>
                </nav>
                <img className='header__logo' src={logoImg} alt='Logo store' />
                <div className='right-side'>
                    <button
                        id='id-btn-course'
                        className='right-side__btn-course'
                        onClick={() => {
                            this.context.showCourseMenu()
                            if (this.contex.showMyBag) this.contex.showMyBagMenu()
                        }}>
                        {this.context.selectedCourse}
                    </button>
                    <button
                        id='id-btn-cart'
                        className='right-side__btn-cart'
                        onClick={() => {
                            this.context.showMyBagMenu()
                        }}>
                        {this.context.myBag.length !== 0 && <div className='product-counter'>{this.context.totalProducts().sum}</div>}
                    </button>
                </div>
                {this.context.showCourse && <div className='currencies-menu'>
                    <CourseMenuWithData />
                </div>}
                {this.context.showMyBag && <MyBag showBag={this.context.showMyBagMenu} />}
            </header>)
    }
}