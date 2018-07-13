import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest, auth}) => (
  <Route
  {...rest}
  render = {props => (
    auth.isAuthenticated ?
      <Component {...props}/>
    :
      <Redirect to='/login' />
  )}
  />
)

const mapStateToProps = state => ({
  auth: state.auth
})

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, {})(PrivateRoute)