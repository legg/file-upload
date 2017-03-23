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
            this.setState({...this.state, source: sourceBase64, name: file.name})
        }
        reader.readAsDataURL(file)
    }

    uploadSource = () => {
        const form = new FormData()
        form.append('name', this.state.name)
        form.append('source', this.state.source)

        fetch('//localhost:3001/image', {
            method: 'POST',
            body: form
        }).then(response => {
            console.log('post image successful', response)
        }).catch(error => {
            console.log('failed to post image', error)
        })
    }

    getSource = () => {
        fetch('//localhost:3001/image/Maximus.jpg')
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({...this.state, serverSource: response.source, name: response.name})
            })
            .catch(error => {
                console.log('failed to get image', error)
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
                <h2>Choose an image file</h2>
                <FileSelect onChange={this.fileSelectHandler.bind(this)}/>
                <h2>Preview the image</h2>
                <FilePreview source={this.state.source}/>
                <br/>
                <h2>Upload the image <small>F12 check network request payload is OK</small></h2>
                <button onClick={this.uploadSource.bind(this)}>upload source</button>
                <br/>
                <h2>Get the image from (mock) api</h2>
                <button onClick={this.getSource.bind(this)}>get source</button>
                <br/>
                <h2>Preview the image from api</h2>
                <FilePreview source={this.state.serverSource}/>
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