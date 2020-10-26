import './App.css';
import React from 'react';
import MD from 'react-showdown';
import hljs from "highlight.js";
import 'highlight.js/styles/solarized-dark.css';

function App() {
    return (
        <div className="App">
            <Header />
            <div id="content">
                <Content file={getPage()} />
            </div>
        </div>
    );
}

class Content extends React.Component {
    constructor(props) {
        super(...arguments)
        this.props = props
        this.state = {
            value: 'Loading...',
        };
    }

    async componentDidMount() {
        let value
        try {
            let data = await fetch(this.props.file);
            if (!data.ok) value = `Error loading page! ${data.status} ${data.statusText}`
            else value = await data.text();
        }
        catch (e) {
            value = `Error loading page! ${e}`
        }
        this.setState({
            value
        })
    }

    componentDidUpdate() {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block);
        });

    }

    render() {
        return (
            <MD
                markdown={this.state.value} options={{ ghCodeBlocks: true }} />
        )
    }
}


function Left() {
    return (
        <div className="logo">
            <a href={process.env.PUBLIC_URL} className="noLink">
                <button>GuildScript</button>
            </a>
        </div>
    )
}

function Header() {
    return (
        <div className="header">
            <Left />
        </div>
    )
}

function getPage() {
    const params = new URLSearchParams(window.location.search);
    let url = params.get('page') || `index.md`
    url = process.env.PUBLIC_URL + '/' + url;
    return url;
};
export default App;
