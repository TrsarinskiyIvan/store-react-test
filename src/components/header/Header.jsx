import './header.css';
import { PureComponent } from "react";
import { Query } from '@apollo/client/react/components';
import { NavLink } from "react-router-dom";
import { CATEGORIES, CURRENCIES } from '../../helper/queries';
import MyBag from '../my-bag/MyBag';
import CartContext from '../../cartContext';

export default class Header extends PureComponent {

    static contextType = CartContext;

    state = {
        showCourseMenu: false,
        showMyBag: false,
    };

    showBag = () => {
        this.setState(p => ({ ...p, showMyBag: !p.showMyBag }));
    }

    render() {

        console.log(this.context)

        return (
            <header className='header'>
                <nav className='navigation'>
                    <Query query={CATEGORIES}>
                        {({ data, loading, error }) => {
                            if (error) return <h2>Error!</h2>;
                            return (!loading &&
                                <ul className='navigation__list'>{data.categories.map((item) => (
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
                                </ul>);
                        }}
                    </Query>
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
                    <Query query={CURRENCIES}>
                        {({ data, loading, error }) => {

                            if (loading) return <h2>Loading...</h2>;
                            if (error) return <h2>Error!</h2>;

                            return (
                                <ul className='currencies__list'>
                                    {data.currencies.map(item => {
                                        return (
                                            <li
                                                id={item.symbol}
                                                className='currencies__list_item'
                                                key={item.label}
                                                onClick={(e) => {
                                                    this.context.selectCourse(e.target.id);
                                                    this.setState(p => ({
                                                        showCourseMenu: !p.showCourseMenu
                                                    }));
                                                }}>
                                                {item.symbol}&nbsp;{item.label}
                                            </li>
                                        );
                                    })}
                                </ul>);
                        }}
                    </Query>
                </div>}
                {this.state.showMyBag && <MyBag showBag={this.showBag} />}
                {this.context.myBag.length !== 0 && <div className='product-counter'>{this.context.totalProducts().sum}</div>}
            </header>);
    }
}