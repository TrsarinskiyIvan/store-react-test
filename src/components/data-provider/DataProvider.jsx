import { Query } from "@apollo/client/react/components"
import { PureComponent } from "react"

export default class DataProvider extends PureComponent {

    render() {
        return (
            <Query query={this.props.query} variables={this.props.variables}>
                {({ data, loading, error }) => {
                    if (loading) return <h2>Loading...</h2>
                    if (error) return <h2>Error!</h2>
                    return this.props.render(data)
                }}
            </Query>
        )
    }
}