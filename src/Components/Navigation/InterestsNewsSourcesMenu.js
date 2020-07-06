import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';

// Icons
import {
  ExpandMore,
  ExpandLess
} from '@material-ui/icons';

class InterestsNewsSourcesMenu extends React.Component {
  state = {
    interestsOpen: false,
    newsSourcesOpen: false
  };

  componentDidMount() {
    this.fetchInterestsAndNewsSources();
  }

  fetchInterestsAndNewsSources = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Must be logged in to get interests and news sources');
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
        if (iNResponse.message) {
          alert(iNResponse.message)
        } else {
          this.props.setInterestsAndNewsSources(iNResponse.interests, iNResponse.news_sources)
        }
      })
  }

  handleInterestsClick = () => {
    this.setState({ interestsOpen: !this.state.interestsOpen });
    this.setState({ newsSourcesOpen: false });
  };

  handleNewsSourcesClick = () => {
    this.setState({ newsSourcesOpen: !this.state.newsSourcesOpen });
    this.setState({ interestsOpen: false });
  };

  mapInterests = () => {
    return this.props.interests.map(interest =>
      <ListItem
        button
        key={interest.name}
        style={{ paddingLeft: '30px' }}
        onClick={() => {
          this.props.history.push(`/interests/${this.slugify(interest.name)}`);
          this.props.history.go();
        }}
      >
        <ListItemText primary={`${interest.name}`} />
      </ListItem>
    )
  }

  mapNewsSources = () => {
    return this.props.newsSources.map(newsSource =>
      <ListItem
        button
        key={newsSource.name}
        style={{ paddingLeft: '30px' }}
        onClick={() => {
          this.props.history.push(`/news-sources/${this.slugify(newsSource.name)}`);
          this.props.history.go();
        }}
      >
        <ListItemText primary={`${newsSource.name}`} />
      </ListItem >
    )
  }

  slugify = (string) => string.split(' ').join('-').toLowerCase();

  render() {
    return (
      <List>
        <ListItem button onClick={this.handleInterestsClick}>
          <ListItemText primary="Interests" />
          {this.state.interestsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.interestsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.mapInterests()}
          </List>
        </Collapse>
        <ListItem button onClick={this.handleNewsSourcesClick}>
          <ListItemText primary="News Sources" />
          {this.state.newsSourcesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.newsSourcesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.mapNewsSources()}
          </List>
        </Collapse>
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    interests: state.menuReducer.interests,
    newsSources: state.menuReducer.newsSources
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInterestsAndNewsSources: (interests, newsSources) =>
      dispatch({ type: 'SET_INTERESTS_AND_NEWS_SOURCES', interests: interests, newsSources: newsSources })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterestsNewsSourcesMenu));