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
                <h4 className="RubricName">RESULTS</h4>

                <div className="row RubricContent scrollbar" id="style-3" >

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
                            return ( <div>
                                <div className="col-md-12 col-sm-12 col-xs-12" key={key}>

                                    <div className="col-md-11 col-sm-11 col-xs-11" >

                                        <h5><b>{data.question}</b>  </h5>
                                    </div>
                                    <div className="col-md-1 col-sm-1 col-xs-1" style={{ padding: "0.5% 0 0px 1%" }}>
                                        <img src="/images/plus icon.png" alt="plus icon"
                                            ref={`plus${key}`}
                                            // handling the answer toggle and view update with its id
                                            onClick={() => this.handleContentOnOff(`plus${key}`, `answer${key}`, data._id, data.views)}
                                            className="view Plus"
                                        />
                                    </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-sx-12">

                                    <p ref={`answer${key}`}>{data.answer}</p>
                                    <hr className="FaqInfoHr" />
                                </div>
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
