import React, {Component} from "react";
import html2canvas from "html2canvas";
import "./MemeGenerator.css";
import { Button, Input } from "@material-ui/core";

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }
    Capture(){
        window.scrollTo(0,0)
        html2canvas(document.getElementById("meme"), { letterRendering: 1,useCORS: true } ).then(function(canvas) {
            const a = document.createElement('a')
            a.href=canvas.toDataURL("image/png")
            a.download="meme.png"
            a.click()
        });
    }
    
    render() {
        return (
        <div className="desktop">
            <header>
            <img 
                src="../memeimg.png" 
                alt="Problem?"
            />
            <p>Meme Generator</p>
            </header>
            <div id="memes">
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <Input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    /> 
                    <Input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    /> 
                
                    <Button variant="contained" color="primary" type="submit">Change Image</Button>
                </form>
                <div className="meme" id="meme">
                    <h2 className="top">{this.state.topText}</h2>
                    <img className="meme_img" src={this.state.randomImg} alt="" />
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
                <Button variant="contained" color="primary" className="btn" onClick={this.Capture}>Download</Button>
            </div>
        </div>
        )
    }
}

export default MemeGenerator