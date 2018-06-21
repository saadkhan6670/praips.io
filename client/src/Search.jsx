import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

@observer class Search extends Component {




    handleContentOnOff(imgref, pRef, viewId, views) {

        if (this.refs[imgref].getAttribute('src') === `${process.env.PUBLIC_URL}/images/plus-icon.png` & this.refs[imgref].className === "view Plus") {
            this.refs[imgref].setAttribute('src', `${process.env.PUBLIC_URL}/images/minus-icon.png`)
            this.refs[imgref].className = "Minus"
            this.refs[pRef].style.display = "block"
            views += 1;
            this.props.store.updateViews(viewId, views)
        }
        else if (this.refs[imgref].getAttribute('src') === `${process.env.PUBLIC_URL}/images/plus-icon.png`) {
            this.refs[imgref].setAttribute('src', `${process.env.PUBLIC_URL}/images/minus-icon.png`)
            this.refs[imgref].className = "Minus"
            this.refs[pRef].style.display = "block"
        }
        else {
            this.refs[imgref].className = "Plus"
            this.refs[imgref].setAttribute('src', `${process.env.PUBLIC_URL}/images/plus-icon.png`)
            this.refs[pRef].style.display = "none"
        }
    }

    render() {
        let content = [];
        this.props.store.Rubrics.forEach(rubrics => {

            rubrics.rubricContent.forEach(rubricsContent => {
                content.push(rubricsContent)
            })

        });


        let filteredContent = content === undefined ? null : content.filter((d) => { return d.content.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1 })
        return (
            <div>
                <h4 className="RubricName">RÉSULTATS
</h4>

                <div className="row RubricContent scrollbar" id="style-3" >

                    {
                        filteredContent === null ? <p>obtenir des données...</p> : filteredContent.length === 0 ? <div>
                            <h4> 
Nous n'avons pas trouvé de résultats pour <b>{this.props.store.searchInput} </b></h4>

                            <b>Ces conseils pourraient aider :</b>
                            <ul>
                                <li>  Essayez moins de mots. Ex: Délais de livraison </li>
                                <li> Essayez différents mots-clés.   </li>
                                <li> Try a more general search (ex: "games and apps" instead of "frontierville").  </li>
                            </ul>

                        </div> : filteredContent.map((data, key) => {
                            return ( <div>
                                <div className="col-md-12 col-sm-12 col-xs-12" key={key}>

                                    <div className="col-md-11 col-sm-11 col-xs-11" >

                                        <h5><b>{data.content.question}</b>  </h5>
                                    </div>
                                    <div className="col-md-1 col-sm-1 col-xs-1" style={{ padding: "0.5% 0 0px 1%" }}>
                                        <img src={`${process.env.PUBLIC_URL}/images/plus-icon.png`} alt="plus icon"
                                            ref={`plus${key}`}
                                            // handling the answer toggle and view update with its id
                                            onClick={() => this.handleContentOnOff(`plus${key}`, `answer${key}`, data.content._id, data.content.views)}
                                            className="view Plus"
                                        /><br/>
                                       
                                        
                                    </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-sx-12">

                                    <p ref={`answer${key}`}>{data.content.answer}</p>
                                    {this.props.store.redirect ?
                                    <div className="questionDiv">
                                    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/eye-icon.png)`}}> 
                                     {data.content.views}
                                    
                                    </div> 
                                               </div>
                                                : null}
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
