window.components = {};
window.components.Header = React.createClass({
    getInitialState: function () {
        return {
            user: {}
        };
    },
    componentDidMount: function () {
    },
    render: function() {
        var name;
        if (this.props.user) {
            name = <span className="login-nav">{this.props.user.name}</span>;
        } else {
            name = <span className="login-nav">登录</span>;
        }
        return (
            <div className="header">
                <span className="logo">技术</span>
                <span className="title">博客</span>
                { this.props.user ? <span className="login-nav">{this.props.user.name}</span> : <span className="login-nav">登录</span> }
            </div>
        );
    }
});

window.components.List = React.createClass({
    getInitialState: function () {
        return {
            list: [],
        };
    },
    componentDidMount: function () {
        fetch('/blog/article/list', {
            method: 'get'
        }).then((res) => {
            return res.json();
        }).catch(error => {
            console.error('Error:', error);
        }).then((data) => {
            console.log(data.data);
            if (data.code === 0) {
                this.setState({
                    list: data.data
                });
            }
        });
    },
    render: function () {
        return (
            <div className="article-lists">
                <ul>
                    {this.state.list.map(item => (
                        <li>
                            <span className="type">{ item.type === 1 ? '文' : '记' }</span>
                            <div className="art-title"><a>{item.title}</a></div>
                            <div className="art-text">{item.text}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
});