(function () {
    window.xl_components = {};
    window.xl = {
        // 获取cookie
        getCookie: function getCookie(name) {
          const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
          const arr = document.cookie.match(reg);
          if (arr) {
            return (arr[2]);
          }
          return null;
        },

        // 设置cookie,增加到vue实例方便全局调用
        setCookie: function (c_name, value, expiredays) {
          const exdate = new Date();
          exdate.setDate(exdate.getDate() + expiredays);
          document.cookie = `${c_name}=${escape(value)}${(expiredays == null) ? '' : `;expires=${exdate.toGMTString()}`}`;
        },

        // 删除cookie
        delCookie: function (name) {
          const exp = new Date();
          exp.setTime(exp.getTime() - 1);
          const cval = xl.getCookie(name);
          if (cval != null) { document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`; }
        },

        parseHash: function () {
            var params = {};
            var param = location.search.slice(1);
            param.split('&').map(function (item) {
                var temp = item.split('=');
                if (temp[0]) {
                    params[temp[0]] = temp[1];
                }
            });
            return params;
        }
    }
    window.xl_fetch = function (url, opt) {
        if (!opt.headers) {
            opt.headers = {};
        }
        opt.headers['x-system'] = 'blog-react-cdn';
        var token = xl.getCookie('blog_react_cdn_token');
        if (token) {
            opt.headers['x-access-token'] = token;
        }
        return fetch(url, opt).then((res) => {
            return res.json();
        });
    };
    window.xl_components.Header = React.createClass({
        getInitialState: function () {
            return {
                user: {}
            };
        },
        componentDidMount: function () {
            var url = '/user/user/info';
            xl_fetch(url, {
                method: 'get'
            }).catch(error => {
                console.error('Error:', error);
            }).then((data) => {
                if (data.code === 0) {
                    this.setState({
                        user: data.data
                    });
                }
            });
        },
        render: function() {
            var name;
            if (this.state.user.name) {
                name = <span className="login-nav">{this.state.user.name}</span>;
            } else {
                name = <span className="login-nav">登录</span>;
            }
            return (
                <div className="header">
                    {this.state.user.github_url && <a target="_blank" href={this.state.user.github_url} className="github_url">Github</a>}
                    <span className="title">博客</span>
                    { this.state.user.name ? <a href="/blog-react-cdn/article/list.html" className="login-nav">{this.state.user.name}</a> : <a href="/blog-react-cdn/login.html" className="login-nav">登录</a> }
                </div>
            );
        }
    });

    window.xl_components.List = React.createClass({
        getInitialState: function () {
            return {
                list: [],
            };
        },
        getArticles: function (type) {
            var url = this.props.url;
            url += type ? ('?type=' + type) : '';
            xl_fetch(url, {
                method: 'get'
            }).catch(error => {
                console.error('Error:', error);
            }).then((data) => {
                if (data.code === 0) {
                    this.setState({
                        list: data.data
                    });
                }
            });
        },
        deleteArticle: function (id) {
            var url = '/blog/article/delete';
            var param = { 'blog_id' : id };
            xl_fetch(url, {
                'method': 'post',
                'body': JSON.stringify(param),
                'headers': {
                    'content-type': 'application/json'
                }
            }).catch(error => {
                console.error('Error:', error);
            }).then((data) => {
                if (data.code === 0) {
                    window.location.reload();
                }
            });
        },
        componentDidMount: function () {
            this.getArticles(this.props.type);
        },
        componentWillReceiveProps(nextProps) {
            this.getArticles(nextProps.type);
        },
        render: function () {
            return (
                <div className="article-lists">
                    <ul>
                        {this.state.list.map(item => (
                            <li>
                                <span className="type">{ item.type === 1 ? '文' : '记' }</span>
                                <div className="art-title"><a target="_blank" href={item.id ? '/blog-react-cdn/article/detail.html?id=' + item.id : 'javascript: void(0);'}>{item.title}</a></div>
                                <div className="art-text">{item.text}</div>
                                { (this.props.delete && item.isAuther) ? <div className="art-delete-btn" onClick={this.deleteArticle.bind(this, item.id)}>删除</div> : '' }
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    });
})();