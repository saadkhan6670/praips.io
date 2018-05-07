import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

@observer class Search extends Component {




    handleContentOnOff(imgref, pRef, viewId, views) {

        if (this.refs[imgref].getAttribute('src') === "/images/plus icon.png" & this.refs[imgref].className === "view") {
            this.refs[imgref].setAttribute('src', "/images/minu icon.png")
            this.refs[imgref].className = ""
            this.refs[pRef].style.display = "block"
            views += 1;
            return this.props.store.updateViews(viewId, views)
        }
        else if (this.refs[imgref].getAttribute('src') === "/images/plus icon.png") {
            this.refs[imgref].setAttribute('src', "/images/minu icon.png")
            this.refs[pRef].style.display = "block"
        }
        else {
            this.refs[imgref].className = ""
            this.refs[imgref].setAttribute('src', "/images/plus icon.png")
            this.refs[pRef].style.display = "none"
        }
    }

    render() {
        let content = [];
        this.props.store.Rubrics.forEach(element => {

            element.content.forEach(rubricsContent => {
                content.push(rubricsContent)
            })

        });


        let filteredContent = content === undefined ? null : content.filter((d) => { return d.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1 })

        return (
            <div>
                <h4 style={{ color: "grey", padding: "0px 65px 0px" }}>Results</h4>

                <div className="row" style={{ padding: "0px 65px 0 65px", overflowY: "scroll", height: "250px", marginRight: "0px" }}>

                    {
                        filteredContent === null ? <p>getting data...</p> : filteredContent.length === 0 ? <div>
                            <h4>  We didn't find results for <b>{this.props.store.searchInput} </b></h4>

                            <b>These tips might help :</b>
                            <ul>
                                <li>  Try fewer words. Ex: Time delivery </li>
                                <li> Try different keywords.   </li>
                                <li> Try a more general search (ex: "games and apps" instead of "frontierville").  </li>
                            </ul>

                        </div> : filteredContent.map((data, key) => {
                            return (
                                <div className="col-lg-12" key={key}>

                                    <h5 style={{ width: "90%" }}><b>{data.question}</b>  </h5>
                                    <img src="/images/plus icon.png" alt="plus icon"
                                        style={{
                                            cursor: "pointer",
                                            position: "sticky", float: "right", bottom: "87%"
                                        }} ref={`plus${key}`}
                                        handling the answer toggle and view update with its id
                                        onClick={() => this.handleContentOnOff(`plus${key}`, `answer${key}`, data._id, data.views)}
                                        className="view"
                                    />
                                    <p style={{ display: "none" }} ref={`answer${key}`}>{data.answer}</p>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Search;
