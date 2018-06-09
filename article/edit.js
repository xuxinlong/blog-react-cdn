(function () {
    var Header = xl_components.Header;
    var List = xl_components.List;


    var Editor = React.createClass({
        getInitialState: function () {
            return {
                style: {}
            };
        },
        componentWillReceiveProps(nextProps) {
            // 获取到文章信息后更新编辑器中的内容
            this.mditor.value = nextProps.value;
        },
        componentDidMount: function () {
            var _this = this;
            // 初始化编辑器，并配置编辑器
            var mditor = window.mditor = this.mditor =  Mditor.fromTextarea(document.getElementById('editor'));
            // 设置mditor的高度
            mditor.height = (window.innerHeight - 65 - 48) + 'px';
            //获取或设置编辑器的值
            mditor.on('ready',function(){
              // mditor.value = _this.props ? _this.props.value : '';
              mditor.value = _this.props.value;
            });
        },
        render: function() {
            return (
                <textarea style={this.state.style} name="editor" id="editor"></textarea>
            );
        }
    });

    var Container = React.createClass({
        getInitialState: function () {
            return {
                'detail': {},
                'title': '',
                'text': '',
                'btn_text': '保存'
            };
        },
        componentDidMount: function () {
            var params = xl.parseHash();
            // 判断是否是新建文章
            if (params.id) {
                var url = '/blog/article/detail';
                var param = {'id': params.id};
                xl_fetch(url, {
                    'method': 'post',
                    'body': JSON.stringify(param),
                    'headers': {
                        'content-type': 'application/json'
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        this.setState({
                            'title': res.data.detail.title,
                            'detail': res.data.detail,
                            'text': res.data.detail.text,
                            'btn_text': (res.data.detail.type === 1) ? '保存文章' : '保存随记'
                        });
                        window.text = res.data.detail.text;
                    }
                });
            } else {
                this.setState({
                    'title': (Number(params.type) === 1) ? '新建文章' : '新建随记',
                    'btn_text': (Number(params.type) === 1) ? '保存文章' : '保存随记'
                });
            }
            this.title = this.state.title;
        },
        save: function () {
            var params = xl.parseHash();
            var url = '/blog/article/add';
            var param = {
                'type': params.type || 2,
                'title': this.refs.title.value,
                'text': this.refs.mditor.mditor.value,
                'user_id': 1,
                'time': new Date().getTime()
            };
            if (params.id) {
                param.blog_id = params.id;
                url = '/blog/article/update'
            }
            xl_fetch(url, {
                'method': 'post',
                'body': JSON.stringify(param),
                'headers': {
                    'content-type': 'application/json'
                }
            }).then((res) => {
                if (res.code === 0) {
                    location.href = 'detail.html?id=' + res.data;
                }
            });
        },
        changeTitle: function (ev) {
            // this.title = ev.target.value
            this.setState({
                'title': ev.target.value
            });
            console.log(this.state.title);
        },
        render: function() {
            return (
                <div className="article-edit">
                    <div className="edit-header">
                        <span className="save-btn" onClick={this.save}>{this.state.btn_text}</span>
                        <input ref="title" value={this.state.title} onInput={this.changeTitle} type="text" />
                    </div>
                    <Editor ref="mditor" value={this.state.text}></Editor>
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