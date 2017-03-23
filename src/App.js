import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            source: ''
        }
    }

    fileSelectHandler = event => {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = e => {
            this.setState({source: e.target.result})
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <FileSelect onChange={this.fileSelectHandler.bind(this)}/>
                <FilePreview source={this.state.source}/>
            </div>
        )
    }
}

const FileSelect = ({onChange}) => {
    return (
        <div>
            <input type="file" onChange={onChange}/>
        </div>
    )
}

const FilePreview = ({source}) => {
    return (
        <div>
            <img src={source} multiple={false} alt=""/>
        </div>
    )
}

export default App