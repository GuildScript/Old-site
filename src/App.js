import './App.css';
import React from 'react';
import MD from 'react-showdown';
import hljs from "highlight.js";
import 'highlight.js/styles/solarized-dark.css';
import Header from './Header'
const { location } = window;

function App() {
    return (
        <div className="App">
            <Header />
            <div id="content">
                <Content />
            </div>
        </div>
    );
}

class Content extends React.Component {
    constructor(props) {
        super(...arguments)
        this.props = props
        this.state = {
            value: 'Loading...'
        };

    }

    async componentDidMount() {
        this.update();
        window.addEventListener('hashchange', this.update.bind(this));
    }

    async update() {
        let value
        try {
            let data = await fetch(getPage());
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

function getPage() {
    let hash = location.hash.substr(1)
    let url = hash ? hash + '.md' : `index.md`
    url = process.env.PUBLIC_URL + '/' + url;
    return url;
};

export default App;
