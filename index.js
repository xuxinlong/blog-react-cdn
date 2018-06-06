var userInfo = {"id":1,"phone":"18170551225","name":"jack"};
var Header = components.Header;
var List = components.List;

ReactDOM.render(
    <div>
        <Header user={userInfo}></Header>
        <div className="container">
            <List></List>
        </div>
    </div>
    ,
    document.getElementById('main')
);