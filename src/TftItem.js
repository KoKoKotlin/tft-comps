import React from "react";
import { Link, Element } from "react-scroll";

import data from "./data/tft.json";
import "./App.css";

import ReactHtmlParser from "react-html-parser";

class TftItemHeader extends React.Component {
    render() {
        const item = this.props.item;
        return(
            <div className="tftheader">
                <span className="tftitemname"><strong>{item.name}</strong></span>
                <div className="tftcompcontainer">{item.comps.map(comp => <div key={comp} className="tftcomp">{comp}</div>)}</div>
                <div>
                    {item.carries.map(carry => {
                        return (
                            <img className="tftcarrypic" alt="" src={this.props.refs[carry]} />
                        );
                    })}   
                </div>
            </div>
        );
    }
}

class TftContentItems extends React.Component {
    render() {
        const item = this.props.item;
        return(
            <div className="tftleftcontent">
                {item.items.map((itemContent, index) => {
                    return (<div key={itemContent + index} className="tftitemcontainer">
                        <img alt="" className="tftitemchamp" src={this.props.refs[itemContent.champ]} />
                        {itemContent.items.map((itemRef, index) => {
                            return(
                                <img key={itemRef + index} alt="" className="tftitemitem" src={this.props.refs[itemRef]}/>
                            );
                        })}
                    </div>);
                })}
            </div>
        );
    }
}

class TftContentList extends React.Component {
    render() {
        return(
            <div>
                <h3 className="tftrightheading">{this.props.heading}:</h3>
                <ul className="tftrightcontent--ul">
                    {this.props.lines.map(line => {
                        return(
                            <li key={line}>
                                {ReactHtmlParser(line)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

class TftItem extends React.Component {
    render() {
        const item = this.props.item;

        return (
            <div>
                <Element name={item.id}></Element>
                <div  className="tftitem" onClick={() => window.open(item.boardUrl, "_blank")}>
                    <TftItemHeader item={item} refs={this.props.refs} />
                    <div className="tftcontent">
                        <TftContentItems item={item} refs={this.props.refs} />
                        <span className="tftcontentseperator tftcontentseperator--vertical"></span>
                        <div className="tftrightcontent">
                            <TftContentList lines={item.requirements} heading={"Requirements"} />
                            <div className="tftcontentseperator tftcontentseperator--horizontal"></div>
                            <TftContentList lines={item.playstyle} heading={"Playstyle"} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class TftLink extends React.Component {
    render() {
        const offset = this.props.index * 260 + 170;
        return(
            <th className="linkstableitem">
                <Link className="linksinlinelink" activeClass="active" to={this.props.id} smooth={true} offset={offset}>{this.props.name}</Link>
            </th>
        );
    }
}

class TftLinks extends React.Component {
    
    createDom() {
        const items = data.data;
        const linksPerRow = 3;
        const numberOfRows = items.length / linksPerRow;
        
        const rows = [];
        for(let i = 0; i < numberOfRows; i++) {
            const row = [];
            for(let j = 0; j < linksPerRow; j++) try { row.push(
                <TftLink index={i * 3 + j} id={items[i * linksPerRow + j].id} name={items[i * linksPerRow + j].name}/>
            ); } catch(e) { } 
            rows.push(<tr>{row}</tr>);    
        }

        return rows;
    }

    render() {
        return(
            <div className="tftlinkcontainer">
                <table className="linkstable">
                    <tbody className="linkstablebody">
                        {this.createDom()}
                    </tbody>
                </table>
            </div>
        );
    }
}

class TftFooter extends React.Component {
    render() {
        return (
        <div className="tftfootercontainer">
            <div className="tftfooteritem">If something is missing or isn't correct/up to date: <a target="_blank" href="https://github.com/KoKoKotlin/KoKoKotlin.github.io/issues">File an issue</a> or <a target="_blank" href="mailto:labruzzler@gmail.com">email me</a></div>
            <div className="tftfooteritem">Last update: {data.last_update}</div>
            <div className="tftfooteritem">Version: {data.version}</div>
        </div>);
    }
}

class TftItemContainer extends React.Component {
    render() {
        return (
            <div>
                <TftLinks />
                {data.data.map((item, index) => {
                    return <TftItem key={index} item={item} refs={data.refs} />;
                })}
                <TftFooter />
            </div>
        );
    }
}

export default TftItemContainer;
