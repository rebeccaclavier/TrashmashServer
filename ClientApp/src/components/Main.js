import React, { Component } from 'react';
import FileDrop from 'react-file-drop';
import axios from 'axios';

import { Uploading } from './Uploading';
import { Result } from './Result';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filetypeError: false,
      uploading: false,
      progress: 0,
      response: null,
      gameDoesExist: null
    };

    this.gameId = (this.props.match.params.server || null);
    this.userId = (this.props.match.params.user || null);
  }

  handleDrop = (files, event) => {
    const file = files[0];

    if (file.name.split('.').pop() !== "mp3") {
      this.setState({
        filetypeError: true
      });
    } else {
      var data = new FormData()
      data.append('file', file);
      data.append('server', this.gameId);
      data.append('user', this.userId);

      axios.request({
        method: 'post',
        url: `api/upload`,
        data: data,
        onUploadProgress: (p) => {
          this.setState({uploading: true, progress: (p.loaded / p.total * 100)})
        }
      }).then(_ => {
        this.setState({progress: 100, response: {success: true}});
      }).catch(error => {
        this.setState({progress: 100, response: {success: false, error: error}});
      });
    }
  }

  componentDidMount() {
    if (this.gameId !== null) {
      axios.request({
        method: 'get',
        url: `api/game?server=${this.gameId}`,
      }).then(data => {
        this.setState({gameDoesExist: true});
      }).catch(error => {
        this.setState({gameDoesExist: false});
      });
    };
  }

  render() {
    if (this.gameId === null || this.userId === null) {
      return (
        <React.Fragment>
          <h1>there's nothing for you here</h1>
          <p>go home</p>
        </React.Fragment>
      );
    }
    
    if (this.state.gameDoesExist !== null) {
      if (!this.state.gameDoesExist) {
        return (
          <h1>invalid id or no game running</h1>
        );
      } else {
        if (!this.state.uploading) {
          return (
            <FileDrop onDrop={this.handleDrop}>
              <h1>drop your trashmash here</h1>
              {!this.state.filetypeError &&
                <p>only .mp3 is supported</p>
              }
              {this.state.filetypeError &&
                <p style={{color: '#ff5252'}}>what part of "only .mp3 is supported" do you not understand?</p>
              }
            </FileDrop>
          );
        } else if (!this.state.response) {
          return (
            <Uploading progress={this.state.progress} />
          );
        } else {
          return (
            <Result response={this.state.response} />
          );
        }
      }
    }

    return null;
  }
}
