var Header = xl_components.Header;
var List = xl_components.List;

ReactDOM.render(
    <div>
        <Header></Header>
        <div className="container">
            <List url={"/blog/article/list_public"} type={1}></List>
        </div>
    </div>
    ,
    document.getElementById('main')
);