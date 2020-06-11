import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';

const mapStateToProps = state => ({state});

class Container extends Component {
  render() {
    console.log(this.props);
    return (<div>Chit fund</div>)
  }
}
export default drizzleConnect(Container,mapStateToProps);
