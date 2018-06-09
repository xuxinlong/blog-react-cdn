var Header = xl_components.Header;
var List = xl_components.List;

var Container = React.createClass({
    getInitialState: function () {
        return {
        	'type': 0
        };
    },
    componentDidMount: function () {
    },
    changeType: function (type) {
    	this.setState({
    		'type': type
    	});
    },
    render: function() {
        return (
	        <div className="container">
			    <div className="left-bar">
			    	<div className="operate-btn">
			    		<input className="search" placeholder="搜索" />
				        <a target="_blank" href="edit.html?type=1" className="create-btn">创建文章</a>
				        <a target="_blank" href="edit.html?type=2" className="create-btn">创建随记</a>
			    	</div>
				    <ul>
				        <li className={this.state.type === 0 ? "all active" : "all" } onClick={this.changeType.bind(this, 0)}>全部</li>
				        <li className={this.state.type === 1 ? "article active" : "article" } onClick={this.changeType.bind(this, 1)}>文章</li>
				        <li className={this.state.type === 2 ? "random active" : "random" } onClick={this.changeType.bind(this, 2)}>随记</li>
				    </ul>
			    </div>
	            <List delete={true} url={"/blog/article/list"} type={this.state.type}></List>
	        </div>
        );
    }
});

ReactDOM.render(
    <div>
        <Header></Header>
        <div className="container">
            <Container></Container>
        </div>
    </div>
    ,
    document.getElementById('main')
);