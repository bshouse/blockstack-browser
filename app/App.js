import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function mapStateToProps(state) {
  return {
    accountCreated: state.account.accountCreated
  }
}

class MainScreen extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return (
      <div className="body-main">
        <Sidebar />
        <div className="content-section">
          <Navbar />
          {this.props.children}
        </div>
      </div>
    )
  }
}

class WelcomeScreen extends Component {
  render() {
    return (
      <div className="body-landing" style={{ backgroundColor: '#1b1e21' }}>
        {this.props.children}
      </div>
    )
  }
}

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    accountCreated: PropTypes.bool.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentHasNewProps(accountCreated) {
    if (!accountCreated) {
      this.context.router.push('/account/create')
    } else {
      this.context.router.push('/')
    }
  }

  componentWillMount() {
    this.componentHasNewProps(this.props.accountCreated)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accountCreated !== this.props.accountCreated) {
      this.componentHasNewProps(nextProps.accountCreated)
    }
  }

  render() {
    if (this.props.accountCreated) {
      return (<MainScreen children={this.props.children} />)
    } else {
      return (<WelcomeScreen children={this.props.children} />)
    }
  }
}


export default connect(mapStateToProps)(App)

/*
{
  (() => {
    if (process.env.NODE_ENV !== 'production') {
      //const DevTools = require('./components/DevTools')
      //return <DevTools />
    }
  })()
}
*/