import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import axios from 'axios';
// import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API"
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";


class Home extends Component {
  // Initialize this.state.books as an empty array
  state = {
    songs: [],
    saved: []
  };

  // Add code here to get all books from the database and save them to this.state.books

  componentDidMount() {
    this.loadBandCamp();
    this.loadSoundcloud();
    this.loadSaved();
  };

  loadSaved = () => {
    // API.getSaved()
    // .then(res => this.setState({ saved: res.data }))
    // .catch(err => console.log(err));
  };

  loadBandCamp = () => {
    axios.get("/api/bandcamp")
      .then((res) => {
        console.log("res.data: ", res.data);
        this.state.append(res.data);
      })
      .catch(err => console.log(err));
  };

  loadSoundcloud = () => {
    axios.get("/api/soundcloud")
      .then((res) => {
        console.log("res.data: ", res.data);
        this.state.append(res.data)
      })
      .catch(err => console.log(err));
  };

  saveSong = song => {
    // API.saveSong(song)
    // .then(API.getSaved()
    //         .then(res => this.setState({ saved: res.data }))
    //         .catch(err => console.log(err)))
    // .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Top Songs</h1>
            </Jumbotron>
            {this.state.songs.length ? (
              <List>
                {this.state.songs.map(song => (
                  <ListItem key={song._id}>
                    <a href={song.url}>
                      <strong>
                        {song.title} 
                      </strong>
                    </a>  
                     {/* <SaveBtn onClick={() => this.saveArticle(article)}/> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved</h1>
            </Jumbotron>
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map(song => (
                  <ListItem key={song._id}>
                    <a href={"/saved/" + song._id}>
                      <strong>
                        {song.title} 
                      </strong>
                    </a>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
