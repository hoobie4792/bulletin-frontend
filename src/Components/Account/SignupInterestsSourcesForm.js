import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Paper, FormControl, Button } from '@material-ui/core';
import SignupSource from './SignupSource';
import SignupInterest from './SignupInterest';

class SignupInterestsSourcesForm extends React.Component {
  componentDidMount() {
    this.fetchSources();
    this.fetchInterests();
    this.fetchUserInterestsAndNewsSources();
  }

  fetchedNewsSources = false;
  fetchedInterests = false;

  fetchSources = () => {
    fetch('http://localhost:3000/api/v1/news_sources')
      .then(res => res.json())
      .then(sources => this.props.setSources(sources))
      .catch(() => alert('Something went wrong'));
  }

  fetchInterests = () => {
    fetch('http://localhost:3000/api/v1/interests')
      .then(res => res.json())
      .then(interests => this.props.setInterests(interests))
      .catch(() => alert('Something went wrong'));
  }

  fetchUserInterestsAndNewsSources = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return;
    }

    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      }
    }

    fetch('http://localhost:3000/api/v1/get-interests-and-news-sources', fetchObj)
      .then(res => res.json())
      .then(iNResponse => {
        if (!iNResponse.message) {
          iNResponse.interests.forEach(interest => {
            this.props.addInterest(interest.id);
          })
          iNResponse.news_sources.forEach(newsSource => {
            this.props.addSource(newsSource.id);
          })
        }
      });
  }

  mapSources = () => {
    return this.props.sources.map(source => <SignupSource
      key={source.id}
      source={source}
      handleSourceChange={this.handleSourceChange}
      checked={this.props.selectedSources.includes(source.id)}
    />)
  }

  mapInterests = () => {
    return this.props.interests.map(interest => <SignupInterest
      key={interest.id}
      interest={interest}
      handleInterestChange={this.handleInterestChange}
      checked={this.props.selectedInterests.includes(interest.id)}
    />)
  }

  handleSourceChange = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.name);
    if (this.props.selectedSources.includes(id)) {
      this.props.removeSource(id);
    } else {
      this.props.addSource(id);
    }
  }

  handleInterestChange = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.name);
    if (this.props.selectedInterests.includes(id)) {
      this.props.removeInterest(id);
    } else {
      this.props.addInterest(id);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Must be logged in to edit sources/interests');
      return;
    }

    this.submitSources(token);
    this.submitInterests(token);
  }

  submitSources = (token) => {
    const sourcesObj = {
      source: {
        ids: this.props.selectedSources
      }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      },
      body: JSON.stringify(sourcesObj)
    }

    fetch('http://localhost:3000/api/v1/user_news_sources', fetchObj)
      .then(res => res.json())
      .then(sourcesResponse => {
        if (sourcesResponse.message) {
          alert(sourcesResponse.message);
        } else {
          this.fetchedNewsSources = true;
          this.waitFetch();
        }
      })
      .catch((error) => alert(`Something went wrong: ${error}`));
  }

  submitInterests = (token) => {
    const interestsObj = {
      interest: {
        ids: this.props.selectedInterests
      }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      },
      body: JSON.stringify(interestsObj)
    }

    fetch('http://localhost:3000/api/v1/user_interests', fetchObj)
      .then(res => res.json())
      .then(interestsResponse => {
        if (interestsResponse.message) {
          alert(interestsResponse.message);
        } else {
          this.fetchedInterests = true;
          this.waitFetch();
        }
      })
      .catch((error) => alert(`Something went wrong: ${error}`));
  }

  waitFetch = () => {
    if (this.fetchedNewsSources && this.fetchedNewsSources) {
      this.props.history.push('/home');
      this.props.history.go();
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e, this.props)}>
        <Paper>
          <FormControl>
            {this.mapSources()}
            {this.mapInterests()}
            <Button type="submit">Submit</Button>
          </FormControl>
        </Paper>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sources: state.signupReducer.sources,
    interests: state.signupReducer.interests,
    selectedSources: state.signupReducer.selectedSources,
    selectedInterests: state.signupReducer.selectedInterests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSources: sources => dispatch({ type: 'SET_SOURCES', sources: sources }),
    setInterests: interests => dispatch({ type: 'SET_INTERESTS', interests: interests }),
    addSource: source => dispatch({ type: 'ADD_SOURCE', source: source }),
    removeSource: source => dispatch({ type: 'REMOVE_SOURCE', source: source }),
    addInterest: interest => dispatch({ type: 'ADD_INTEREST', interest: interest }),
    removeInterest: interest => dispatch({ type: 'REMOVE_INTEREST', interest: interest })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupInterestsSourcesForm));