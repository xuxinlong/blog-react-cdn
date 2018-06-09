(function () {
    var Header = xl_components.Header;
    var List = xl_components.List;

    var Articleinfo = React.createClass({
        getInitialState: function () {
            return {
            };
        },
        componentDidMount: function () {
        },
        render: function() {
            return (
                <div className="article-header">
                    <div className="article-title">{this.props.detail ? this.props.detail.title : ''}</div>
                    <div className="article-info">
                        <div className="info">
                          <span>作者：{this.props.user_info ? this.props.user_info.name : ''}</span>
                          <div><span>日期：{this.props.detail ? this.props.detail.time : ''}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span> 字数:{(this.props.detail && this.props.detail.text) ? this.props.detail.text.length : ''}</span></div>
                        </div>
                        {(this.props.detail && this.props.detail.isAuther) ? <a href={'edit.html?id=' + this.props.detail.id} className="edit-btn">编辑</a> : ''}
                    </div>
                </div>
            );
        }
    });
    var Articletext = React.createClass({
        getInitialState: function () {
            return {};
        },
        componentWillReceiveProps(nextProps) {
            document.getElementById('markdown_body').innerHTML = nextProps.text;
        },
        componentDidMount: function () {
            document.getElementById('markdown_body').innerHTML = this.props.text;
        },
        render: function() {
            return (
                <div className="markdown-body" id="markdown_body">
                </div>
            );
        }
    });

    var Container = React.createClass({
        getInitialState: function () {
            return {
                'user_info': {},
                'detail': {},
                'text': ''
            };
        },
        componentDidMount: function () {
            var url = '/blog/article/detail';
            var params = xl.parseHash();
            var param = {'id': params.id};
            xl_fetch(url, {
                'method': 'post',
                'body': JSON.stringify(param),
                'headers': {
                    'content-type': 'application/json'
                }
            }).then((res) => {
                if (res.code === 0) {
                    var parser = new Mditor.Parser();
                    this.setState({
                        'user_info': res.data.user_info,
                        'detail': res.data.detail,
                        'text': parser.parse(res.data.detail.text)
                    });
                    window.text = res.data.detail.text;
                }
            });
        },
        render: function() {
            return (
                <div className="container">
                    <Articleinfo user_info={this.state.user_info} detail={this.state.detail}></Articleinfo>
                    <Articletext text={this.state.text}></Articletext>
                </div>
            );
        }
    });

    ReactDOM.render(
        (
        <div>
            <Header></Header>
            <Container></Container>
        </div>
        )
        ,
        document.getElementById('main')
    );
})();