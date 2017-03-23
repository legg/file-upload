import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {}
    }

    fileSelectHandler = event => {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = e => {
            const sourceBase64 = e.target.result
            this.setState({source: sourceBase64, name: file.name})
        }
        reader.readAsDataURL(file)
    }

    uploadSource = () => {
        const form = new FormData()
        form.append('name', this.state.name)
        form.append('source', this.state.source, this.state.name)

        fetch('//localhost:3001/image', {
            method: 'POST',
            body: form
        }).then(response => {
            console.log('post image successful', response)
        }).catch(error => {
            console.log('failed to post image', error)
        })
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
                <br/>
                <button onClick={this.uploadSource.bind(this)}>upload source</button>
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