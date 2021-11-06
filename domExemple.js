// const Field = React.forwardRef(function(props, ref){
//     return <div className="form-group">
//         <input type="text" className="form-control" ref={ref} />
//     </div>
// })

class Field extends React.Component{

    render(){
        return <div className="form-group">
            <label htmlFor="">{this.props.label}</label>
            <input type="text" className="form-control" ref={this.props.forwardRef} />
        </div>
    }
}

const FieldWithRef = React.forwardRef((props, ref) => {
    return <Field forwardRef={ref}  {...props} />
})

class Home extends React.Component{

    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.input = React.createRef()
    }
    
    handleClick (e) {
        console.log('Le formulaire contient la valeur : ' + this.input.current.value)
    }

    render () {
        return <div>
            <FieldWithRef ref={this.input} label="demo" />
            <button onClick={this.handleClick}>Tester</button>
        </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('app'))