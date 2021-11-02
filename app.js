function WelcomeFunc({name, children}){
    return <div>
        <h1>Bonjour {name}</h1>
        <p>{children}</p>
        </div>
}

class Welcome extends React.Component {
    render(){
        console.log(this.props);
        return <React.Fragment>
        <h2>Bonjour {this.props.name}</h2>
        <p>{this.props.children}</p>
        </React.Fragment>
    }
}

class HomeOld extends React.Component{
    render(){
        return <div>
            <Welcome name="Dorothé" />
            <Welcome name="Benjamin" />
            <Welcome name="Jean" />
            <Welcome name="Testeur1" />
            <Welcome name="Dorothé" />
            </div>

    }
}

class Clock extends React.Component{

    constructor(props){
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentwillUnmount(){
        window.clearInterval(this.timer)
    }

    tick(){
        this.setState({date: new Date()})
    }

    render(){
        return <div>
            il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class ManualIncrementer extends React.Component{

    constructor(props){
        super(props)
        this.state = {n:0}
    }

    addIncrement(e){
        e.preventDefault();
        this.setState((state,props) => ({n: this.state.n + 1}))
    }

    render(){
        return <div>Valeur : {this.state.n} <button onClick={this.addIncrement.bind(this)}>Incrémenter</button></div>
    }

}


class Incrementer extends React.Component{

    constructor (props) {
        super(props)
        //console.log(props)
        this.state = {compteur: props.start, timer: null}
        this.toggle = this.toggle.bind(this)
        this.reset = this.reset.bind(this)
    }

    componentDidMount () {
        this.startEvent()
    }

    componentwillUnmount () {
        this.stopEvent()
    }

    changeVal () {
        this.setState((state, props) => ({compteur: this.state.compteur + this.props.step}))
    }

    stopEvent () {
        window.clearInterval(this.state.timer)
        this.setState((state, props) => ({timer: null}))
    }

    resetEvent () {
        this.stopEvent()
        this.setState((state, props) => ({timer: null,compteur:0}))
        this.startEvent()
    }

    startEvent () {
        window.clearInterval(this.state.timer)
        this.setState({timer: window.setInterval(this.changeVal.bind(this),1000)})
    }

    toggle () {
        return this.state.timer ? this.stopEvent() : this.startEvent()
    }

    reset () {
        return this.resetEvent();
    }

    label () {
        return this.state.timer ? "Pause" : "Lecture"
    }

    render () {
        return <React.Fragment>
            <div>Compteur : {this.state.compteur}</div>
            <button onClick={this.toggle}>{this.label()}</button>
            <button onClick={this.reset}>Réinitialisé</button>
        </React.Fragment>
    }
}

Incrementer.defaultProps = {start:0,step:1}



class Home2 extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            nom: "",
            description:"",
            option:"",
            option2: "",
            checked:true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        e.target.name == 'description' ? this.setState({description:e.target.value}) : 
        e.target.name == 'nom' ? this.setState({nom:e.target.value}) : 
        e.target.name == 'option' ? this.setState({option:e.target.value}) : 
        e.target.name == 'option2' ? this.setState({option2:Array.from(e.target.selectedOptions).map(o => o.value)}) : 
        e.target.name == 'checked' ? this.setState({checked:e.target.checked}) : 
        null
    }

    render () {
        return <React.Fragment>
            <div>
                <label htmlFor="nom">Nom</label><br />
                <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}/>
            </div>
            
            <div>
                <label htmlFor="description">Description</label><br />
                <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
            </div>

            <div>
                <label htmlFor="option">Option</label><br />
                <select name="option" id="option" value={this.state.selectionOption} onChange={this.handleChange}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>

            <div>
                <label htmlFor="option2">Option Multiple</label><br />
                <select name="option2" id="option2" value={this.state.selectionOption} onChange={this.handleChange} multiple>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>

            <div>
            <label htmlFor="checked">Checkbox</label><br />
                <input type="checkbox" name="checked" checked={this.state.checked} onChange={this.handleChange} /> Option 1

                {this.state.checked ? <div>Un message à afficher si la checkbox est cocher</div> : null}
            </div>

        </React.Fragment>
    }
}


/* TP - Convertisseur Celsius - Fahrenheit */

const scaleNames = {
    c:"Celcius",
    f:"Fahrenhit"
}

class TemperatureInput extends React.Component{
    
    constructor(props){
        super(props)
        //this.state = {temperature:''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        //this.setState({temperature: e.target.value})
        this.props.onChangeTemperature(e.target.value)
    }

    render(){
        const {temperature} = this.props
        const name = 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <React.Fragment>
            <div className="form-group">
                <label htmlFor={name}>Température ({scaleName})</label>
                <input type="text" id={name} onChange={this.handleChange} value={temperature} />
            </div>
        </React.Fragment>
    }
}

function BoilingVerdict({celcius}){
    if(celcius >= 100){
        return <div className="alert alert-success">L'eau bout</div>
    }else{
        return <div className="alert alert-danger">L'eau ne bout pas</div>
    }
}

/**
 * 
 *  
 * FORMULE CONVERSION FAHRENHIT EN CELCIUS  
 * T(°C) = (T(°F) - 32) × 5/9
 * T(°F) = T(°C) x 9/5 + 32 
 */
function toCelcius(fahrenhit){
    return (fahrenhit - 32) * 5/9
}

function toFahrenhit(celcius){
    return celcius * 9/5 + 32
}

function tryConvert(temperature, convert){
    const value = parseFloat(temperature)
    if(Number.isNaN(value)){return '';}
    return (Math.round(convert(value) * 100) / 100).toString()
}

class Tptemp extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            temperature:20,
            scale: 'c'
        }
        //this.handleChange = this.handleChange.bind(this)
        this.handleCelciusChange = this.handleCelciusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }


    handleCelciusChange(temperature){
        this.setState({
            scale:'c',
            temperature
        })
    }

    handleFahrenheitChange(temperature){
        this.setState({
            scale:'f',
            temperature
        })
    }

    render() {
        const {temperature, scale} = this.state
        const celcius = scale === 'c' ? temperature : tryConvert(temperature,toCelcius)
        const fahrenhit = scale === 'f' ? temperature : tryConvert(temperature,toFahrenhit)
        return <React.Fragment>
            <TemperatureInput scale="c" temperature={celcius} onChangeTemperature={this.handleCelciusChange} />
            <TemperatureInput scale="f" temperature={fahrenhit} onChangeTemperature={this.handleFahrenheitChange} />
            <BoilingVerdict celcius={parseFloat(celcius)}></BoilingVerdict>
        </React.Fragment>
    }
}

function Home () {
    return <div>
        <Home />
    </div>
}

//ReactDOM.render(<Welcome name="JonathWelcomean">Bonjour tout le monde</Welcome>, document.querySelector('#app'))

ReactDOM.render(<Tptemp />, document.querySelector('#app'))