/**
 * 
 * TP : Liste de produit

 */

 const Products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const ProductRow = React.memo(function({product}){
    const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
    //wait(500)
    console.log('render product');
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
})

//const ProductRow = React.memo(ProductRowComponent)

function ProductCategoryRow({category}){
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}


function ProductTable({products, inStockOnly, filterText}){
    const rows = []
    let lastCategory = null

    products.forEach(product => {

        if((inStockOnly && !product.stocked) || (product.name.indexOf(filterText) === -1)){
            return
        }

        if(product.category !== lastCategory){
            lastCategory = product.category
            rows.push(<ProductCategoryRow key={lastCategory} category={product.category}></ProductCategoryRow>)
        }
        
        rows.push(<ProductRow onClick={() => this.demo = 1} key={product.name} product={product}></ProductRow>)

    })

    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
}

class SearchBar extends React.PureComponent{

    constructor(props){
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e){
        this.props.onStockChange(e.target.checked)
    }

    render(){
        const {filterText, inStockOnly} = this.props
        return <div className="mb-3">
            <div className="form-group mb-0">
                <input type="text" value={filterText} className="form-control" placeholder="Rechercher" onChange={this.handleFilterTextChange}></input>
            </div>
            <div className="form-check">
                <input type="checkbox" checked={inStockOnly} className="form-check-input" id="stock" onChange={this.handleInStockChange} />
                <label htmlFor="stock" className="form-check-label"> Produit en stock seulement</label>
            </div>
        </div>
    }
}

class FilterableProductTable extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleInStockChange = this.handleInStockChange.bind(this)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps, nextState)
        return nextProps.products !== this.state.products || 
        nextState.filterText !== this.state.filterText || 
        nextState.inStockOnly !== this.state.inStockOnly

        //return false;
    }

    handleFilterTextChange(filterText){
        this.setState({filterText})
    }

    handleInStockChange(inStockOnly){
        this.setState({inStockOnly})
    }

    render(){
        console.log('render')
        const {products} = this.props
        return <React.Fragment>
            <SearchBar 
            filterText={this.state.filterText} 
            inStockOnly={this.state.inStockOnly} 
            onFilterTextChange={this.handleFilterTextChange}
            onStockChange={this.handleInStockChange}
            />
            <ProductTable 
            products={products} 
            filterText={this.state.filterText} 
            inStockOnly={this.state.inStockOnly}></ProductTable>
        </React.Fragment>
    }
}

ReactDOM.render(<FilterableProductTable products={Products}></FilterableProductTable>, document.getElementById('app'))

// const Products2 = [...Products, {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 8"}];

// window.setTimeout(function(){
//     ReactDOM.render(<FilterableProductTable products={Products2}></FilterableProductTable>, document.getElementById('app'));
// }, 2000)