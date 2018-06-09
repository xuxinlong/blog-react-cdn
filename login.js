(function () {
    var Header = xl_components.Header;

    var LoginContainer = React.createClass({
        getInitialState: function () {
            return {
            };
        },
        componentDidMount: function () {
            var url = '/blog/article/detail';
            var params = xl.parseHash();
            var param = {'id': params.id};
            // xl_fetch(url, {
            //     'method': 'post',
            //     'body': JSON.stringify(param),
            //     'headers': {
            //         'content-type': 'application/json'
            //     }
            // }).then((res) => {
            //     if (res.code === 0) {
            //         var parser = new Mditor.Parser();
            //         this.setState({
            //             'user_info': res.data.user_info,
            //             'detail': res.data.detail,
            //             'text': parser.parse(res.data.detail.text)
            //         });
            //         window.text = res.data.detail.text;
            //     }
            // });
        },
        login: function () {
            let url = '/user/user/login_public';
            let params = {
                'phone': this.refs.phone.value,
                'password': this.refs.password.value
            };
            if (params.phone === '') {

            } else if (params.password === '') {

            } else {
                xl_fetch(url, {
                    'method': 'post',
                    'body': JSON.stringify(params),
                    'headers': {
                        'content-type': 'application/json'
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        var data = res.data.data
                        xl.setCookie('blog_token', data.token);
                        location.href = 'article/list.html';
                    }
                });
            }
        },
        render: function() {
            return (
                <div className="login-container">
                    <div className="input-cont">
                        <div className="logo">
                            <a>龍</a>
                        </div>
                        <div className="input-prepend name">
                            <i></i>
                            <input ref="phone" placeholder="手机号" name="name" />
                        </div>
                        <div className="input-prepend password">
                            <i></i>
                            <input ref="password" placeholder="密码" name="password" type="password" />
                        </div>
                        <div className="login-btn" onClick={this.login}>登录</div>
                    </div>
                </div>
            );
        }
    });

    ReactDOM.render(
        (
            <div>
                <Header></Header>
                <LoginContainer></LoginContainer>
            </div>
        )
        ,
        document.getElementById('main')
    );
})();