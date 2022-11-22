import { gql } from '@apollo/client'

export const CATEGORIES = gql`
            query getCategories{
                categories {
                    name
                }
            }`

export const CATEGORY = gql`
            query getCategory($input:CategoryInput){
                category(input:$input){
                    name
                    products{
                        inStock
                        id
                        name
                        brand
                        gallery
                        attributes{
                            id
                            name
                            type
                            items{
                                displayValue
                                value
                                id
                            }
                        }
                        prices{
                            amount
                            currency{
                                symbol
                                label
                            }
                        }
                    }
                }
            }`

export const CURRENCIES = gql`
            query getCurrencies{
                currencies{
                    label
                    symbol
                }
            }`

export const PRODUCTS = gql`query getPropducts {
                categories {
                    name
                    products{
                        name
                        id
                        inStock
                        gallery
                        prices{
                            amount
                            currency{
                                label
                                symbol
                            }
                        }
                    }
                }
            }`;
export const PRODUCT = gql`
    query GetProduct($id:String!){
        product(id:$id){
            id
            name
            inStock
            gallery
            description
            category
            attributes{
                id
                name
                type
                items{
                    displayValue
                    value
                    id
                }
            }
            brand
            prices{
                amount
            }
        }
    }`